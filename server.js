const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

  // Normalise URL path
  let filePath = req.url === '/' ? '/index.html' : req.url;
  
  // Strip query parameters
  const qIdx = filePath.indexOf('?');
  if (qIdx !== -1) {
    filePath = filePath.substring(0, qIdx);
  }

  const fullPath = path.join(PUBLIC_DIR, filePath);

  // Check if file exists inside public directory
  fs.access(fullPath, fs.constants.F_OK, (err) => {
    if (err) {
      // 404 Not Found
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(`<h1>404 Not Found</h1><p>The file ${filePath} could not be found.</p>`);
      return;
    }

    // Read and serve file
    fs.readFile(fullPath, (readErr, content) => {
      if (readErr) {
        // 500 Internal Server Error
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(`<h1>500 Internal Server Error</h1><p>Error reading file: ${readErr.message}</p>`);
        return;
      }

      const ext = path.extname(fullPath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    });
  });
});

server.listen(PORT, () => {
  console.log('\n==================================================');
  console.log(`🚀 Launch My Clothing Brand Local Dev Server`);
  console.log(`   Running at: http://localhost:${PORT}`);
  console.log('==================================================');
  console.log('Press Ctrl+C to stop the server.\n');
});
