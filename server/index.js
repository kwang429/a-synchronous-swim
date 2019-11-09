


const httpHandler = require('./js/httpHandler');
const keypressHandler = require('./js/keypressHandler');
// require the messageQueue
const messageQueue = require('./js/messageQueue');
// add message to queue
// pass queue initialize of httpHandler
keypressHandler.initialize(message => {
  httpHandler.initialize(messageQueue);
  messageQueue.enqueue(message);
  console.log(`Message received: ${message}`);
});



const http = require('http');
const server = http.createServer(httpHandler.router);

const port = 3000;
const ip = '127.0.0.1';
server.listen(port, ip);

console.log('Server is running in the terminal!');
console.log(`Listening on http://${ip}:${port}`);
