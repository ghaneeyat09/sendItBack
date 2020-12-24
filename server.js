const http = require('http');
const app = require('./app');
const PORT = process.env.PORT || 5050;
const server = http.createServer(app);


server.listen(PORT, () => {
    console.log('now listening to port 5050');
});