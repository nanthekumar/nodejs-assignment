// Log a message when the script starts running
console.log("Node script is running...");

// Import required modules
const http = require('http');
const fs = require('fs');
const path = require('path');

// Create an HTTP server
const server = http.createServer((req, res) => {
  const url = req.url;

  // Route: Home Page (/)
  if (url === '/') {
    fs.readFile(path.join(__dirname, 'views', 'index.html'), 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }

      // Inject current datetime
      const updatedHtml = data.replace('{{datetime}}', new Date().toLocaleString());
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(updatedHtml);
    });

  // Route: About Page
  } else if (url === '/about') {
    fs.readFile(path.join(__dirname, 'views', 'about.html'), 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading about.html');
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });

  // Route: Contact Page
  } else if (url === '/contact') {
    fs.readFile(path.join(__dirname, 'views', 'contact.html'), 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading contact.html');
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });

  // Static Files (e.g. CSS)
  } else if (url.startsWith('/public/')) {
    const filePath = path.join(__dirname, url);
    const ext = path.extname(filePath);
    const contentType = {
      '.css': 'text/css',
      '.js': 'text/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpeg'
    }[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Static file not found');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });

  // Fallback: 404 Page
  } else {
    fs.readFile(path.join(__dirname, 'views', '404.html'), 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading 404.html');
      }
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  }
});

// Define the port
const PORT = 3000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
}).on('error', (err) => {
  console.error('Server error:', err);
});
