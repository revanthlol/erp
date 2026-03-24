"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const chalk_1 = __importDefault(require("chalk"));
const fs = require("fs");
const path = require("path");
const erpClient_1 = require("./services/erpClient");

dotenv_1.default.config();

const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
const isProd = process.env.NODE_ENV === "production";

/* ---------- LOG FILE SETUP ---------- */
const logDir = path.join(__dirname, "logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const logFile = fs.createWriteStream(
    path.join(logDir, isProd ? "prod.log" : "dev.log"),
    { flags: "a" }
);

function logToFile(message) {
    if (isProd) logFile.write(message + "\n");
}

/* ---------- TIME + COLOR HELPERS ---------- */
function time() {
    return new Date().toISOString();
}

function log(level, colorFn, message) {
    const line = `[${time()}] [${level}] ${message}`;
    console.log(colorFn(line));
    logToFile(line);
}

/* ---------- REQUEST LOGGER (DURATION) ---------- */
app.use((req, res, next) => {
    const start = process.hrtime.bigint();

    res.on("finish", () => {
        const end = process.hrtime.bigint();
        const durationMs = Number(end - start) / 1e6;

        log(
            "REQ",
            chalk_1.default.cyan,
            `${req.method} ${req.originalUrl} → ${res.statusCode} (${durationMs.toFixed(2)} ms)`
        );
    });

    next();
});

app.use((0, cors_1.default)({
    origin: allowedOrigin === '*' ? true : allowedOrigin,
    credentials: true
}));

app.use(express_1.default.json());

const sessionStore = new Map();

/* ---------- LOGIN ---------- */
app.post('/api/login', async (req, res) => {
    const { rollNo, password } = req.body;

    log("AUTH", chalk_1.default.yellow, `Login attempt | rollNo=${rollNo}`);

    if (!rollNo || !password) {
        log("WARN", chalk_1.default.yellowBright, "Missing credentials");
        return res.status(400).json({ error: 'Missing credentials' });
    }

    const client = new erpClient_1.ERPClient();

    try {
        const success = await client.login({ rollNo, password });

        if (success) {
            const sessionId = `sess_${rollNo}_${Date.now()}`;
            sessionStore.set(sessionId, client);

            log("AUTH", chalk_1.default.green, `Login success | session=${sessionId}`);
            res.json({ success: true, token: sessionId });
        } else {
            log("AUTH", chalk_1.default.red, `Login failed | rollNo=${rollNo}`);
            res.status(401).json({ success: false, error: 'Invalid credentials or login failed' });
        }
    } catch (error) {
        log("ERROR", chalk_1.default.redBright, `Login error | ${error.message}`);
        res.status(500).json({ success: false, error: error.message });
    }
});

/* ---------- AUTH CHECK ---------- */
function getClient(token, res) {
    if (!token || !sessionStore.has(token)) {
        log("WARN", chalk_1.default.yellowBright, "Unauthorized access attempt");
        res.status(401).json({ error: 'Unauthorized' });
        return null;
    }
    return sessionStore.get(token);
}

/* ---------- STUDENT ROUTES ---------- */

app.get('/api/student/profile', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const client = getClient(token, res);
    if (!client) return;

    try {
        const data = await client.getStudentProfile();
        log("PROFILE", chalk_1.default.green, "Profile fetched");
        res.json(data);
    } catch (error) {
        log("ERROR", chalk_1.default.red, `Profile fetch failed | ${error.message}`);
        res.status(500).json({ error: 'Failed to scrape profile' });
    }
});

app.get('/api/student/subjects', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const client = getClient(token, res);
    if (!client) return;

    try {
        const data = await client.getStudentSubjects();
        log("SUBJECTS", chalk_1.default.green, "Subjects fetched");
        res.json(data);
    } catch (error) {
        log("ERROR", chalk_1.default.red, `Subjects failed | ${error.message}`);
        res.status(500).json({ error: 'Failed to scrape subjects' });
    }
});

app.get('/api/student/attendance', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const client = getClient(token, res);
    if (!client) return;

    try {
        const data = await client.getAttendance();
        log("ATTENDANCE", chalk_1.default.green, "Attendance fetched");
        res.json(data);
    } catch (error) {
        log("ERROR", chalk_1.default.red, `Attendance failed | ${error.message}`);
        res.status(500).json({ error: 'Failed to scrape attendance' });
    }
});

app.get('/api/student/attendance/hourly', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const client = getClient(token, res);
    if (!client) return;

    try {
        const data = await client.getHourWiseAttendance();
        log("ATTENDANCE-HOURLY", chalk_1.default.green, "Hourly attendance fetched");
        res.json(data);
    } catch (error) {
        log("ERROR", chalk_1.default.red, `Hourly attendance failed | ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch hourly logs' });
    }
});

app.get('/api/student/internals', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const client = getClient(token, res);
    if (!client) return;

    try {
        const data = await client.getInternalMarks();
        log("INTERNALS", chalk_1.default.green, "Internals fetched");
        res.json(data);
    } catch (error) {
        log("ERROR", chalk_1.default.red, `Internals failed | ${error.message}`);
        res.status(500).json({ error: 'Failed to scrape internals' });
    }
});

app.get('/api/student/exams', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const client = getClient(token, res);
    if (!client) return;

    try {
        const data = await client.getExamResults();
        log("EXAMS", chalk_1.default.green, "Exam results fetched");
        res.json(data);
    } catch (error) {
        log("ERROR", chalk_1.default.red, `Exams failed | ${error.message}`);
        res.status(500).json({ error: 'Failed to scrape exams' });
    }
});
/* ---------- IMAGE PROXY ---------- */
app.get('/api/proxy/image', async (req, res) => {
    const token = req.query.token;
    const imageUrl = req.query.url;

    log("IMAGE", chalk_1.default.blue, `Proxy request | ${imageUrl}`);

    if (!token || !sessionStore.has(token)) {
        log("WARN", chalk_1.default.yellow, "Unauthorized image access");
        res.status(401).send("Unauthorized");
        return;
    }

    if (!imageUrl) {
        log("WARN", chalk_1.default.yellow, "Missing image URL");
        res.status(400).send("Missing URL");
        return;
    }

    const client = sessionStore.get(token);

    try {
        const imageStream = await client.fetchImageStream(imageUrl);
        res.setHeader('Content-Type', 'image/jpeg');
        imageStream.pipe(res);
        log("IMAGE", chalk_1.default.green, "Image streamed");
    } catch (e) {
        log("ERROR", chalk_1.default.red, `Image fetch failed | ${e.message}`);
        res.status(404).send("Image Not Found");
    }
});

/* ---------- SERVER START ---------- */
app.listen(port, () => {
    console.log(chalk_1.default.magenta("======================================"));
    console.log(chalk_1.default.green("🚀 ERP Backend Server Started"));
    console.log(chalk_1.default.cyan(`📡 Port           : ${port}`));
    console.log(chalk_1.default.cyan(`🌍 Allowed Origin : ${allowedOrigin}`));
    console.log(chalk_1.default.cyan(`📝 Log file       : logs/${isProd ? "prod.log" : "dev.log"}`));
    console.log(chalk_1.default.magenta("======================================"));
});
