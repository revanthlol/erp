import axios, { AxiosInstance } from 'axios';
import { CookieJar } from 'tough-cookie';
import * as cheerio from 'cheerio';
import qs from 'qs';
import { AttendanceHistory, AttendanceRecord, AttendanceResponse, ExamResultRecord, HourlyAttendanceResponse, HourlyLog, HourlyStats, InternalComponent, InternalMarkSubject, LoginCredentials, StudentProfileData, StudentSubject } from '../types';

export class ERPClient {
  private client: AxiosInstance;
  private jar: CookieJar;
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.ERP_BASE_URL || 'http://202.160.160.58:8080/lastudentportal';
    this.jar = new CookieJar();
    
    this.client = axios.create({
      baseURL: this.baseUrl,
      withCredentials: true, 
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      // Mimic browser: follow redirects (Friend's code does this naturally)
      // but we handle cookies manually since we lack the support wrapper
      maxRedirects: 0, 
      validateStatus: (status) => status >= 200 && status < 500,
    });

    // 1. SIMPLE COOKIE INJECTOR (Manual "wrapper")
    this.client.interceptors.request.use(async (config) => {
        // ALWAYS use the baseUrl for cookie matching to effectively force Global Scope
        // This solves the /loginManager vs /report path issue without complex rules
        const cookieString = await this.jar.getCookieString(this.baseUrl);
        if (cookieString && config.headers) {
            config.headers.set('Cookie', cookieString);
        }
        return config;
    });

    // 2. SIMPLE COOKIE SAVER
    this.client.interceptors.response.use(async (response) => {
        const cookies = response.headers['set-cookie'];
        if (cookies) {
             const list = Array.isArray(cookies) ? cookies : [cookies];
             for (const c of list) {
                 // Force save to ROOT domain logic
                 try { await this.jar.setCookie(c, this.baseUrl); } catch(e) {}
             }
        }
        return response;
    });
  }

  async login(creds: LoginCredentials): Promise<boolean> {
    const loginUrl = '/students/loginManager/youLogin.jsp';
    
    // Payload from logs
    const payload = {
      txtAN: creds.rollNo,
      txtSK: creds.password,
      txtPageAction: '1',
      _tries: '1',
      login: 'iamalsouser',
      passwd: 'haveaniceday',
      _save: 'Log In',
    };

    console.log(`[Auth] POST ${creds.rollNo}...`);
    try {
        const res = await this.client.post(loginUrl, qs.stringify(payload));
        
        // Logic: 302 Found = Success. 
        if (res.status === 302) {
             console.log('[Auth] Success (302 Redirect). Session Ready.');
             return true;
        }

        // Logic: If 200, check if we are stuck on login form
        const $ = cheerio.load(res.data);
        if ($('input[name="txtSK"]').length > 0) {
            console.error('[Auth] Failed: Login form still present.');
            return false;
        }

        // Sometimes it returns 200 with "Wait" screen. That's technically logged in.
        return true; 
    } catch (e) {
        console.error('[Auth] Failed', e);
        return false;
    }
  }

async getStudentProfile(): Promise<StudentProfileData> {
    const profilePath = '/students/report/studentProfile.jsp';
    const fullProfileUrl = new URL(profilePath, this.baseUrl).toString();
    const menuReferer = `${this.baseUrl}/students/template/PageLeft.jsp`;
    
    try {
      console.log(`[Scraper] Fetching Profile...`);
      const response = await this.client.get(profilePath, { headers: { 'Referer': menuReferer }});

      if (response.status === 302 && response.headers.location?.includes('Login')) {
          throw new Error("Session Expired");
      }

      const html = response.data;
      const $ = cheerio.load(html);

      const data: any = {
          name: '', regNo: '', course: '', sem: '', 
          institution: '', dob: '', gender: '', aadhaar: '',
          father: '', address: '', contact: '', email: '',
          parentContact: '', admitted: '', community: '',
          nationality: '', hosteller: '', income: '', state: ''
      };

      // Loop Parsing
      $('table.maintable tr').each((_, row) => {
          const cells = $(row).find('td');
          if (cells.length < 3) return;
          const label = $(cells[0]).text().toLowerCase().replace(/[^a-z]/g, '');
          const val = $(cells[2]).text().trim();
          if (!val) return;

          if (label === 'studentname') data.name = val;
          else if (label.includes('regis')) data.regNo = val;
          else if (label === 'course') data.course = val;
          else if (label.includes('semester')) data.sem = val;
          else if (label === 'institution') data.institution = val;
          else if (label.includes('dob')) { const parts = val.split('/'); data.dob = parts[0]; data.gender = parts[1]?.trim() || ''; }
          else if (label.includes('aadhaar')) data.aadhaar = val;
          else if (label.includes('father')) data.father = val;
          else if (label.includes('residential')) data.address = val;
          else if (label.includes('studentcontact')) { const parts = val.split('/'); data.contact = parts[0]; data.email = parts[1]?.trim() || ''; }
          else if (label.includes('parent')) data.parentContact = val;
          else if (label.includes('admitted')) data.admitted = val;
          else if (label.includes('community')) data.community = val;
          else if (label.includes('nationality')) data.nationality = val;
          else if (label === 'hosteller') data.hosteller = val;
          else if (label.includes('income')) data.income = val.replace('/', '').trim();
          else if (label.includes('state')) data.state = val;
      });

      // --- URL RESOLUTION FIX ---
      let imgSrc = $('#divImage img').attr('src');
      if (imgSrc) {
        // FORCE CONCATENATION:
        // this.baseUrl (http://202.../lastudentportal)
        // profilePath (/students/report/studentProfile.jsp)
        // We strip the trailing/leading slash overlap manually to be 100% sure.
        const cleanBase = this.baseUrl.replace(/\/$/, ''); 
        const cleanPath = profilePath.startsWith('/') ? profilePath : `/${profilePath}`;
        
        // Full Page URL: http://202.../lastudentportal/students/report/studentProfile.jsp
        const fullPageUrl = cleanBase + cleanPath;
        const pageUrlObj = new URL(fullPageUrl); 

        // Resolve '../../resources/...' against this proper URL
        const resolvedUrl = new URL(imgSrc, pageUrlObj).toString();
        
        data.photoUrl = resolvedUrl;
        console.log(`[Scraper] Photo Resolved: ${resolvedUrl}`);
      }
      // --- FIX END ---

      return data as StudentProfileData;

    } catch (error) {
      console.error('[Scraper] Error fetching profile', error);
      throw error;
    }
  }

   async fetchImageStream(imageUrl: string): Promise<any> {
    console.log(`[Proxy] Fetching stream: ${imageUrl}`);
    
    // Explicit warning if context is missing again
    if (!imageUrl.includes('/lastudentportal/')) {
       console.warn(`[Proxy] Critical: Context /lastudentportal missing! Image load will fail.`);
    }

    try {
        const response = await this.client.get(imageUrl, {
            responseType: 'stream',
            headers: {
                // Ensure referer matches the origin context
                'Referer': `${this.baseUrl}/students/report/studentProfile.jsp`,
                'Accept': 'image/*'
            }
        });
        return response.data; 
    } catch (error: any) {
        console.error(`[Proxy] Fail: ${error.response?.status} on ${imageUrl}`);
        throw new Error('Image Load Failed');
    }
  }
  
  // CORRECTED getStudentSubjects METHOD
  async getStudentSubjects(): Promise<StudentSubject[]> {
    const url = '/students/report/studentWiseSubjects.jsp';
    const referer = `${this.baseUrl}/students/template/PageLeft.jsp`;
    
    console.log(`[Scraper] Fetching Subjects from: ${url}`);
    
    try {
        const response = await this.client.get(url, { headers: { 'Referer': referer } });
        
        // Safety check for session expiry redirection
        if (response.status === 302 || (response.data && typeof response.data === 'string' && response.data.includes("Login"))) {
            throw new Error("Session Expired");
        }

        const $ = cheerio.load(response.data);
        const subjects: StudentSubject[] = [];

        // Selecting by the specific ID used in your JSP
        const rows = $('#tblStudentWiseSubjects tr');

        if (rows.length === 0) {
             console.warn("[Scraper] Warning: No subject table found (#tblStudentWiseSubjects).");
        }

        rows.each((i, row) => {
            // HTML analysis:
            // Headers and Titles use styling/classes that might lack clean 'td's, 
            // so we filter by column count.
            const cols = $(row).find('td');
            
            // Your HTML shows data rows have 5 columns: 
            // Sem | ID(Type) | Code | Name | Credit
            if (cols.length < 5) return; 

            const sem = $(cols[0]).text().trim();
            
            // Skip header rows like "Semester", "ID", etc.
            if (sem.toLowerCase() === 'semester' || !sem.match(/^\d+$/)) return;

            const typeRaw = $(cols[1]).text().trim(); // E.g., Core, AECC, N/A
            const codeRaw = $(cols[2]).text().trim();
            const nameRaw = $(cols[3]).text().trim();
            const creditRaw = $(cols[4]).text().trim();

            subjects.push({
                sem: sem,
                type: typeRaw || "Core", // Use official type from HTML
                code: codeRaw,
                name: nameRaw,
                credit: parseFloat(creditRaw) || 0
            });
        });

        console.log(`[Scraper] Parsed ${subjects.length} subjects successfully.`);
        return subjects;

    } catch (e) {
        console.error('[Scraper] Failed to fetch subjects', e);
        throw e;
    }
  }
async getAttendance(): Promise<AttendanceResponse> {
    const url = '/students/report/studentSubjectWiseAttendance.jsp';
    const referer = `${this.baseUrl}/students/template/PageLeft.jsp`;

    console.log(`[Scraper] Fetching Attendance...`);

    try {
        const response = await this.client.get(url, { headers: { Referer: referer } });
        if (response.status === 302) throw new Error("Session Expired");

        const $ = cheerio.load(response.data);
        const subjects: AttendanceRecord[] = [];
        const history: AttendanceHistory[] = [];
        const meta = { total: 0, present: 0, absent: 0, pct: 0 };

        // 1. Subject Table Parsing
        $('#tblSubjectWiseAttendance tr').each((i, row) => {
            const cols = $(row).find('td');
            
            // FIX: Subtotal Row Logic (Offset by colspan=2 in first cell)
            // HTML: [Total (colspan=2)] [136] [122] [14] [89.71%]
            // Index: 0                  1     2     3    4
            if ($(row).attr('class') === 'subtotal') {
                meta.total = parseInt($(cols[1]).text().trim()) || 0;
                meta.present = parseInt($(cols[2]).text().trim()) || 0;
                meta.absent = parseInt($(cols[3]).text().trim()) || 0;
                meta.pct = parseFloat($(cols[4]).text().replace('%', '').trim()) || 0;
                return;
            }

            // Normal Data Rows
            if ($(row).attr('class') === 'subheader' || $(row).find('.header').length > 0) return;
            if (cols.length < 6) return;

            const code = $(cols[0]).text().trim();
            if (!code || code.length < 2) return;

            subjects.push({
                code: code,
                name: $(cols[1]).text().trim(),
                total: parseInt($(cols[2]).text().trim()) || 0,
                present: parseInt($(cols[3]).text().trim()) || 0,
                absent: parseInt($(cols[4]).text().trim()) || 0,
                pct: parseFloat($(cols[5]).text().replace('%', '').trim()) || 0
            });
        });

        // 2. History Parsing
        const histTable = $('table#tblCumulativeDetails').first();
        histTable.find('tr').each((i, row) => {
             const cols = $(row).find('td');
             if ($(row).attr('class') === 'subheader' || $(row).find('.header').length > 0) return;

             // Only parse data rows (e.g., "Nov-2025")
             if (cols.length >= 7) {
                 history.push({
                     month: $(cols[0]).text().trim(),
                     present: parseInt($(cols[1]).text().trim()) || 0,
                     absent: parseInt($(cols[2]).text().trim()) || 0,
                     odP: parseInt($(cols[3]).text().trim()) || 0,
                     odA: parseInt($(cols[4]).text().trim()) || 0,
                     med: parseInt($(cols[5]).text().trim()) || 0,
                     cas: parseInt($(cols[6]).text().trim()) || 0
                 });
             }
        });

        // If meta extraction failed (sometimes subtotal is missing?), sum manually
        if (meta.total === 0 && subjects.length > 0) {
            meta.total = subjects.reduce((a, b) => a + b.total, 0);
            meta.present = subjects.reduce((a, b) => a + b.present, 0);
            meta.absent = subjects.reduce((a, b) => a + b.absent, 0);
            meta.pct = parseFloat(((meta.present / meta.total) * 100).toFixed(2));
        }

        console.log(`[Scraper] Attendance Stats -> P:${meta.present} A:${meta.absent} (${meta.pct}%)`);
        return { subjects, history, meta };

    } catch (e) {
        console.error('[Scraper] Failed to fetch attendance', e);
        throw e;
    }
  }

    async getHourWiseAttendance(): Promise<HourlyAttendanceResponse> {
    const url = '/students/report/studentHourWiseAttendance.jsp';
    const referer = `${this.baseUrl}/students/template/PageLeft.jsp`; // Mimic sidebar click

    console.log(`[Scraper] Fetching Hour-Wise Logs...`);

    try {
        const response = await this.client.get(url, { headers: { Referer: referer } });
        
        // Session Check
        if (response.status === 302 || response.data.includes("Login")) {
            throw new Error("Session Expired");
        }

        const $ = cheerio.load(response.data);
        
        // 1. Extract Summary from Hidden Inputs (Most reliable source in your JSP)
        const getHiddenVal = (id: string) => parseFloat($(`input[id='${id}']`).val() as string) || 0;

        const stats: HourlyStats = {
            workingDays: getHiddenVal('hdnWorkingDays'),
            presentHours: getHiddenVal('hdnHrsPresent'),
            absentHours: getHiddenVal('hdnHrsOverAllAbsent'), // Includes Leave, OD, etc. as per JSP logic
            percentage: getHiddenVal('hdnPresentPercentage'),
            od: getHiddenVal('hdnOD'),
            ml: getHiddenVal('hdnML'),
            cl: getHiddenVal('hdnCL')
        };

        // 2. Extract Daily Logs
        const logs: HourlyLog[] = [];
        
        // Strategy: Iterate over rows in the log table
        // Rows start with a 'td.subheader' containing the Date
        $('table[name="table1"] tr').each((_, row) => {
            const dateCell = $(row).find('td.subheader').first();
            if (dateCell.length === 0) return; // Skip headers

            const dateStr = dateCell.text().trim(); // "19-Dec-2025"
            if (!dateStr || dateStr.includes("Date")) return;

            // Day title attribute (e.g., '1st Day')
            const dayType = dateCell.attr('title') || "";

            // Collect hours
            const hours: string[] = [];
            $(row).find('td').each((idx, cell) => {
                // Skip index 0 (Date column)
                if (idx === 0) return;
                
                // Status text usually just "P", "A", or empty nbsp
                let status = $(cell).text().trim();
                
                // Handle "&nbsp;" or empty
                if (!status || status.charCodeAt(0) === 160) status = "-"; 
                
                hours.push(status);
            });

            // Ensure we captured valid data (usually 5 hours)
            if (hours.length > 0) {
                logs.push({
                    date: dateStr,
                    dayType,
                    hours: hours.slice(0, 5) // Normalize to first 5 hours
                });
            }
        });

        console.log(`[Scraper] Parsed ${logs.length} hourly logs.`);
        return { logs, stats };

    } catch (e) {
        console.error('[Scraper] Failed hourly attendance', e);
        throw e;
    }
  }

  // ... inside ERPClient
  async getInternalMarks(): Promise<InternalMarkSubject[]> {
    const url = '/students/report/studentInternalMarkDetails.jsp';
    const referer = `${this.baseUrl}/students/template/PageLeft.jsp`;

    console.log(`[Scraper] Fetching Internal Marks...`);

    try {
        const response = await this.client.get(url, { headers: { Referer: referer } });
        
        if (response.status === 302 || response.data.includes("Login")) {
            throw new Error("Session Expired");
        }

        const $ = cheerio.load(response.data);
        const results: InternalMarkSubject[] = [];

        // Structure: Main Row (Subject Info) is followed immediately by a Row containing the Details Table
        // We select the rows that have a `title` attribute or onClick events (The visible subject rows)
        const subjectRows = $('#tblSubjectWiseInternalMarks > tbody > tr').filter((_, el) => {
             // Basic filter: Row must contain subject data (cells with code/name)
             return $(el).attr('title') !== undefined || $(el).attr('onclick') !== undefined;
        });

        subjectRows.each((_, row) => {
            const cells = $(row).find('td');
            if (cells.length < 4) return;

            const code = $(cells[0]).text().trim();
            const name = $(cells[1]).text().trim();
            const ob = $(cells[2]).text().trim(); // Obtained
            const max = $(cells[3]).text().trim(); // Max

            // Finding the components: The DETAILS row is the immediate next sibling
            const detailsRow = $(row).next('tr');
            const components: InternalComponent[] = [];

            // Inside details row -> div -> table (#tblComponentWiseMarks)
            const detailTable = detailsRow.find('table#tblComponentWiseMarks tr');
            
            detailTable.each((_, dRow) => {
                const dCells = $(dRow).find('td');
                if (dCells.length < 3) return;

                // Index 0: Label, Index 1: Obtained (Usually Empty or Value), Index 2: Max
                // The provided HTML shows "Obtained" at index 1 is mostly empty text, but contains inputs/values sometimes
                const label = $(dCells[0]).text().trim();
                let obt = $(dCells[1]).text().trim(); 
                let mx = $(dCells[2]).text().trim();

                // Validation
                if(!obt) obt = "-"; // Placeholder for empty values

                components.push({
                    label,
                    obtained: obt,
                    max: mx
                });
            });

            results.push({
                code, name, obtainedTotal: ob, maxTotal: max, components
            });
        });

        console.log(`[Scraper] Found ${results.length} subjects for internals.`);
        return results;

    } catch (e) {
        console.error('[Scraper] Failed to fetch internals', e);
        throw e;
    }
  }

  // ... inside ERPClient class
  async getExamResults(): Promise<ExamResultRecord[]> {
    const url = '/students/report/studentExamResultsDetails.jsp';
    const referer = `${this.baseUrl}/students/template/PageLeft.jsp`;

    console.log(`[Scraper] Fetching Exam Results...`);

    try {
        const response = await this.client.get(url, { headers: { Referer: referer } });
        
        if (response.status === 302 || response.data.includes("Login")) {
            throw new Error("Session Expired");
        }

        const $ = cheerio.load(response.data);
        const results: ExamResultRecord[] = [];

        // Logic: The JSP renders each row inside a unique div class='subTable'
        // We select the rows inside these tables.
        $('div.subTable table tr').each((_, row) => {
            const cols = $(row).find('td');
            if (cols.length < 10) return;

            // Mapping based on the provided HTML Header:
            // 0: Sem, 1: Month, 2: Part, 3: SubPart, 4: Code, 5: Name, 
            // 6: Credit, 7: Points, 8: Grade, 9: Result, 10: Attempts
            
            results.push({
                sem: $(cols[0]).text().trim(),
                month: $(cols[1]).text().trim(),
                part: $(cols[2]).text().trim(),
                subPart: $(cols[3]).text().trim(),
                code: $(cols[4]).text().trim(),
                name: $(cols[5]).text().trim(),
                credit: parseFloat($(cols[6]).text().trim()) || 0,
                point: parseFloat($(cols[7]).text().trim()) || 0,
                grade: $(cols[8]).text().trim(),
                result: $(cols[9]).text().trim(),
                attempts: parseInt($(cols[10]).text().trim()) || 1
            });
        });

        console.log(`[Scraper] Parsed ${results.length} exam records.`);
        return results;

    } catch (e) {
        console.error('[Scraper] Failed to fetch exam results', e);
        throw e;
    }
  }
}


