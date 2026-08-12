import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Serve static files from root directory, automatically serving .html files for extensionless routes
app.use(express.static(__dirname, { extensions: ['html'] }));

// Fallback for requests without extensions
app.get('*', (req, res, next) => {
  if (req.path.includes('.')) {
    return next();
  }
  
  const possibleHtmlPath = path.join(__dirname, `${req.path}.html`);
  if (fs.existsSync(possibleHtmlPath)) {
    return res.sendFile(possibleHtmlPath);
  }

  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
