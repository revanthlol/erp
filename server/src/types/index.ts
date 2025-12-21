export interface LoginCredentials {
  rollNo: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  sessionId?: string;
}

export interface StudentProfileData {
  name: string;
  regNo: string;
  course: string;
  sem: string;
  institution: string;
  dob: string;
  gender: string;
  aadhaar: string;
  father: string;
  address: string;
  contact: string;
  email: string;
  parentContact: string;
  admitted: string;
  community: string;
  nationality: string;
  hosteller: string;
  income: string;
  state: string;
  photoUrl: string;
}

export interface StudentSubject {
  sem: string;
  type: string;
  code: string;
  name: string;
  credit: number;
}

export interface AttendanceRecord {
    code: string;
    name: string;
    total: number;
    present: number;
    absent: number;
    pct: number;
}
export interface AttendanceHistory {
    month: string;
    present: number;
    absent: number;
    odP: number;
    odA: number;
    med: number;
    cas: number;
}

export interface AttendanceResponse {
    subjects: AttendanceRecord[];
    history: AttendanceHistory[];
    meta: {
        total: number;
        present: number;
        absent: number;
        pct: number;
    };
}


export interface HourlyLog {
    date: string;
    dayType?: string; // e.g. "1st Day"
    hours: string[]; // ["P", "P", "A", "P", "P"]
}

export interface HourlyStats {
    workingDays: number;
    presentHours: number;
    absentHours: number; // overall absent
    percentage: number;
    od: number;
    ml: number;
    cl: number;
}

export interface HourlyAttendanceResponse {
    logs: HourlyLog[];
    stats: HourlyStats;
}

export interface InternalComponent {
    label: string; // e.g. "Assignment", "Mid Exam 1"
    obtained: string; // Using string to preserve formatting "0.00" or empty
    max: string;
}

export interface InternalMarkSubject {
    code: string;
    name: string;
    obtainedTotal: string; // The aggregate in the main row
    maxTotal: string;
    components: InternalComponent[];
}

export interface ExamResultRecord {
    sem: string;
    month: string;
    part: string; // e.g., "I", "II"
    subPart: string; // e.g., "Core", "AECC" - useful context
    code: string;
    name: string;
    credit: number;
    point: number;
    grade: string;
    result: string;
    attempts: number;
}