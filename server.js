const http = require('http');
const app = require('./app');

const server = http.createServer(app);


server.listen(5050, () => {
    console.log('now listening to port 5050');
})