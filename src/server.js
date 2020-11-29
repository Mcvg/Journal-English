const http = require('http');
const app = require('./app');
const config = require('./config/global');

const port = parseInt(process.env.port, 10) || config.port;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
  console.log('Server is up and running on port number ' + port);
});
server.setTimeout(config.setTimeout);
