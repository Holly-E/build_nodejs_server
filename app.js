const http = require('http');
const fs = require('fs');

const host = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
 fs.readFile('./public/index.html', 'utf8', (err, data) => {
   if (err) {
     res.writeHead(404);
     res.end('404 error, file not found');
   } else {
     res.writeHead(200, {
       'Content_Type': 'text/html'
     });
     res.end(data);
   }
 })
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
