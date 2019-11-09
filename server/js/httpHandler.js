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

  // GET to '/' => random swim command
  if(req.method === 'GET') {
    // array of directions
    var directions = ['up', 'down', 'left', 'right'];
    // random pick
    var rdm = Math.floor(Math.random() * 4);
    var pick = directions[rdm];
    // handle GET request
      // respond with random direction
      // write a response code of 200
      res.writeHead(200, headers);
      // end response w/ msg
      res.end(pick);
  }

  if(req.method === 'POST') {
    // handle POST request
    switch(req.url) {
      case '/COMMANDS':
        // post data
          // add message
          var msg = req._postData;
          messageQueue.enqueue(msg);
          // send response code
          res.writeHead(201);
          // end response
          res.end();
        break;
      case '/IMG':
        // post img
        break;
      default:
    }
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  }

  // respond approiately to bad request

  // respond to GET /COMMANDS
  // respond to POST /COMMANDS
  // respond to POST /IMG
  // respond to undefined routes w/ 404
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  next(); // invoke next() at the end of a request to help with testing!
};
