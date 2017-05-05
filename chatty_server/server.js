// server.js
const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const uuidV4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;
const colors = ['#a3fd7f', '#b4f11', '#283FB3', '#DB18B9'];
// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({server});

function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

function getRandomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  const userColor = getRandomArrayElement(colors);
 
  // broadcast user online count
  const userMsg = {
    type: 'userCount',
    count: wss.clients.size
  };
  broadcast(JSON.stringify(userMsg));

  ws.on('message', (msg) => {
    const msgTemp = JSON.parse(msg);
    msgTemp.id = uuidV4();

    switch (msgTemp.type) {
      case 'postMessage':
        msgTemp.color = userColor;
        msgTemp.type = 'incomingMessage';
        break;
      case 'postNotification':
        msgTemp.type = 'incomingNotification';
        break;
      default:
        throw new Error("Unknown event type from client side" + msgTemp.type)
    }

    const msgToBroadcast = JSON.stringify(msgTemp);
    broadcast(msgToBroadcast);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    const userMsg = {
      type: 'userCount',
      count: wss.clients.size
    };
    broadcast(JSON.stringify(userMsg));
  });
});