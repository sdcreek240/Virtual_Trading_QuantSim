const http = require('http');
const port = process.env.INGESTOR_PORT ? parseInt(process.env.INGESTOR_PORT,10) : 4001;
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && (req.url === '/health' || req.url === '/healthz')) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({status: 'ok', pid: process.pid, port}));
    return;
  }
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end('Ingestor service running\n');
    return;
  }
  res.writeHead(404, {'Content-Type':'text/plain'});
  res.end('Not Found');
});
server.listen(port, () => {
  console.log(`Ingestor service listening on port ${port}`);
});
