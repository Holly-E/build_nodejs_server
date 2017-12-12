const http = require('http');
const fs = require('fs');

const host = 'localhost';
const port = 3000;

let reqProps = ['url', 'method', 'httpVersion', 'headers'];
let resProps = ['statusMessage', 'statusCode', '_header'];

const server = http.createServer((req, res) => {
 fs.readFile('./public/index.html', 'utf8', (err, data) => {
   if (err) {
     res.writeHead(404);
     res.end('404 error, file not found');
   } else {
     res.writeHead(200, {
       'Content_Type': 'text/html'
     });

     let request = reqProps.map(function(props) {
       return { [props] : req[props] };
     });
     let response = resProps.map(function(props) {
       return { [props] : res[props] };
     });
     data = data.replace("{{ req }}", JSON.stringify(request, null, 2))
                .replace("{{ res }}", JSON.stringify(response, null, 2));
     res.end(data);
   }
 });
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
