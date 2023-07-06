const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Get the requested file path
  const filePath = path.join(__dirname, 'public', req.url);

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File not found, return a 404 error
      res.statusCode = 404;
      res.end('404 Not Found');
      return;
    }

    // Read the file and serve its contents
    fs.readFile(filePath, (err, data) => {
      if (err) {
        // Error reading the file, return a 500 error
        res.statusCode = 500;
        res.end('500 Internal Server Error');
        return;
      }

      // Set the appropriate content type based on the file extension
      const ext = path.extname(filePath);
      let contentType = 'text/html';
      if (ext === '.css') {
        contentType = 'text/css';
      } else if (ext === '.js') {
        contentType = 'text/javascript';
      }

      // Set the response headers
      res.setHeader('Content-Type', contentType);

      // Send the file contents as the response
      res.end(data);
    });
  });
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Server is listening on localhost:3000');
});
