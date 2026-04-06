"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const erpClient_1 = require("./services/erpClient");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use((0, cors_1.default)({
    origin: allowedOrigin === '*' ? true : allowedOrigin,
    credentials: true
}));
app.use(express_1.default.json());
const sessionStore = new Map();
const isSessionExpiredError = (error) => {
    const message = String(error?.message || error || '');
    return message.toLowerCase().includes('session expired');
};
app.post('/api/login', async (req, res) => {
    const { rollNo, password } = req.body;
    if (!rollNo || !password)
        return res.status(400).json({ error: 'Missing credentials' });
    const client = new erpClient_1.ERPClient();
    try {
        const success = await client.login({ rollNo, password });
        if (success) {
            const sessionId = `sess_${rollNo}_${Date.now()}`;
            sessionStore.set(sessionId, client);
            res.json({ success: true, token: sessionId });
        }
        else {
            res.status(401).json({ success: false, error: 'Invalid credentials or login failed' });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
app.get('/api/student/profile', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token || !sessionStore.has(token))
        return res.status(401).json({ error: 'Unauthorized' });
    const client = sessionStore.get(token);
    try {
        const data = await client.getStudentProfile();
        res.json(data);
    }
    catch (error) {
        if (isSessionExpiredError(error)) {
            sessionStore.delete(token);
            return res.status(401).json({ error: 'Session expired' });
        }
        res.status(500).json({ error: 'Failed to scrape profile' });
    }
});
app.get('/api/student/subjects', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token || !sessionStore.has(token))
        return res.status(401).json({ error: 'Unauthorized' });
    const client = sessionStore.get(token);
    try {
        const data = await client.getStudentSubjects();
        res.json(data);
    }
    catch (error) {
        if (isSessionExpiredError(error)) {
            sessionStore.delete(token);
            return res.status(401).json({ error: 'Session expired' });
        }
        res.status(500).json({ error: 'Failed to scrape subjects' });
    }
});
app.get('/api/student/attendance', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token || !sessionStore.has(token))
        return res.status(401).json({ error: 'Unauthorized' });
    const client = sessionStore.get(token);
    try {
        const data = await client.getAttendance();
        res.json(data);
    }
    catch (error) {
        if (isSessionExpiredError(error)) {
            sessionStore.delete(token);
            return res.status(401).json({ error: 'Session expired' });
        }
        res.status(500).json({ error: 'Failed to scrape attendance' });
    }
});
app.get('/api/student/attendance/hourly', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token || !sessionStore.has(token))
        return res.status(401).json({ error: 'Unauthorized' });
    const client = sessionStore.get(token);
    try {
        const data = await client.getHourWiseAttendance();
        res.json(data);
    }
    catch (error) {
        if (isSessionExpiredError(error)) {
            sessionStore.delete(token);
            return res.status(401).json({ error: 'Session expired' });
        }
        res.status(500).json({ error: 'Failed to fetch hourly logs' });
    }
});
app.get('/api/student/internals', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token || !sessionStore.has(token))
        return res.status(401).json({ error: 'Unauthorized' });
    const client = sessionStore.get(token);
    try {
        const data = await client.getInternalMarks();
        res.json(data);
    }
    catch (error) {
        if (isSessionExpiredError(error)) {
            sessionStore.delete(token);
            return res.status(401).json({ error: 'Session expired' });
        }
        res.status(500).json({ error: 'Failed to scrape internals' });
    }
});
app.get('/api/student/exams', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token || !sessionStore.has(token))
        return res.status(401).json({ error: 'Unauthorized' });
    const client = sessionStore.get(token);
    try {
        const data = await client.getExamResults();
        res.json(data);
    }
    catch (error) {
        if (isSessionExpiredError(error)) {
            sessionStore.delete(token);
            return res.status(401).json({ error: 'Session expired' });
        }
        res.status(500).json({ error: 'Failed to scrape exams' });
    }
});
app.get('/api/student/fees', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token || !sessionStore.has(token))
        return res.status(401).json({ error: 'Unauthorized' });
    const client = sessionStore.get(token);
    try {
        const data = await client.getFees();
        res.json(data);
    }
    catch (error) {
        if (isSessionExpiredError(error)) {
            sessionStore.delete(token);
            return res.status(401).json({ error: 'Session expired' });
        }
        res.status(500).json({ error: 'Failed to sync fees' });
    }
});
// --- NEW PROXY ROUTE ---
app.get('/api/proxy/image', async (req, res) => {
    const token = req.query.token;
    const imageUrl = req.query.url;
    if (!token || !sessionStore.has(token)) {
        res.status(401).send("Unauthorized");
        return;
    }
    if (!imageUrl) {
        res.status(400).send("Missing URL");
        return;
    }
    const client = sessionStore.get(token);
    try {
        const imageStream = await client.fetchImageStream(imageUrl);
        // Pipe the stream directly to response
        // Express usually detects Content-Type, or we can assume jpeg
        res.setHeader('Content-Type', 'image/jpeg');
        imageStream.pipe(res);
    }
    catch (e) {
        res.status(404).send("Image Not Found");
    }
});
app.get('/', (req, res) => {
    res.send('Server is active and running.');
});
app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
});
