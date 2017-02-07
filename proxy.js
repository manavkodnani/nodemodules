const http = require('http');
const axios = require('axios');

const requestListener = (request, response) => {
  const getGoogle = () => axios.get('http://10.31.194.51:3000/');
  getGoogle().then((result) => {
    response.writeHead(200);
    response.end(result.data);
  })
    .catch((error) => {
      response.writeHead(500);
      response('<h1>Error loading google </h1>')
    });
};

const server = http.createServer(requestListener);
console.log('listening on port 3000')
server.listen(3000);