const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  var directions = ['up', 'down', 'left', 'right'];

  // GET to '/' => random swim command
  if(req.method === 'GET') {
    var command = messageQueue.dequeue();
    res.writeHead(200, headers);
    res.end(command);
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  }

  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  next(); // invoke next() at the end of a request to help with testing!
};
