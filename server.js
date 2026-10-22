import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint required by hosting platforms
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API form submission handlers
app.post(['/api/newsletter', '/api/day-pass', '/api/book-tour', '/api/contact'], (req, res) => {
  const { type, email, name, phone, message } = req.body || {};
  console.log(`Received form submission [${req.path}]:`, { type, email, name, phone });
  
  // Return success response for frontend handling
  res.status(200).json({
    success: true,
    message: 'Submission received successfully.',
    receivedAt: new Date().toISOString(),
  });
});

// Serve static files from Vite build output directory
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath, {
  maxAge: '1d',
  etag: true,
}));

// React client-side routing fallback (serve index.html for all non-static, non-api routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      res.status(500).send('Application build not found. Please run "npm run build".');
    }
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Spacedesk Production Server running on http://${HOST}:${PORT}`);
});
