import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ERPClient } from './services/erpClient';
import { LoginCredentials } from './types';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(cors({ 
    origin: allowedOrigin === '*' ? true : allowedOrigin, 
    credentials: true 
}));
app.use(express.json());

const sessionStore = new Map<string, ERPClient>();

app.post('/api/login', async (req, res) => {
  const { rollNo, password }: LoginCredentials = req.body;
  if (!rollNo || !password) return res.status(400).json({ error: 'Missing credentials' });

  const client = new ERPClient();
  try {
    const success = await client.login({ rollNo, password });
    if (success) {
      const sessionId = `sess_${rollNo}_${Date.now()}`;
      sessionStore.set(sessionId, client);
      res.json({ success: true, token: sessionId });
    } else {
      res.status(401).json({ success: false, error: 'Invalid credentials or login failed' });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/student/profile', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token || !sessionStore.has(token)) return res.status(401).json({ error: 'Unauthorized' });

  const client = sessionStore.get(token)!;
  try {
    const data = await client.getStudentProfile();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to scrape profile' });
  }
});

app.get('/api/student/subjects', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token || !sessionStore.has(token)) return res.status(401).json({ error: 'Unauthorized' });

  const client = sessionStore.get(token)!;
  try {
    const data = await client.getStudentSubjects();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to scrape subjects' });
  }
});

app.get('/api/student/attendance', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token || !sessionStore.has(token)) return res.status(401).json({ error: 'Unauthorized' });

  const client = sessionStore.get(token)!;
  try {
    const data = await client.getAttendance();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to scrape attendance' });
  }
});

app.get('/api/student/attendance/hourly', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token || !sessionStore.has(token)) return res.status(401).json({ error: 'Unauthorized' });

  const client = sessionStore.get(token)!;
  try {
    const data = await client.getHourWiseAttendance();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch hourly logs' });
  }
});

app.get('/api/student/internals', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token || !sessionStore.has(token)) return res.status(401).json({ error: 'Unauthorized' });

  const client = sessionStore.get(token)!;
  try {
    const data = await client.getInternalMarks();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to scrape internals' });
  }
});

app.get('/api/student/exams', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token || !sessionStore.has(token)) return res.status(401).json({ error: 'Unauthorized' });

  const client = sessionStore.get(token)!;
  try {
    const data = await client.getExamResults();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to scrape exams' });
  }
});

// --- NEW PROXY ROUTE ---
app.get('/api/proxy/image', async (req, res) => {
    const token = req.query.token as string;
    const imageUrl = req.query.url as string;

    if (!token || !sessionStore.has(token)) {
        res.status(401).send("Unauthorized");
        return;
    }
    if (!imageUrl) {
        res.status(400).send("Missing URL");
        return;
    }

    const client = sessionStore.get(token)!;

    try {
        const imageStream = await client.fetchImageStream(imageUrl);
        // Pipe the stream directly to response
        // Express usually detects Content-Type, or we can assume jpeg
        res.setHeader('Content-Type', 'image/jpeg');
        imageStream.pipe(res);
    } catch (e) {
        res.status(404).send("Image Not Found");
    }
});

app.get('/', (req, res) => {
  res.send('Server is active and running.');
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});

