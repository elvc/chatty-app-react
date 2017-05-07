# Project Description
---

## Overview
Many of the web applications that you use today have real-time functionality where the user does not have to reload the page in order to see updates. Major examples of these include Slack, Twitter and Facebook.

With that in mind, this Chatty app was created using React and WebSocket to achieve similar functionality

## Requirements

- Primarily a client-side SPA (single-page app) built with ReactJS
- Based on the HTML and CSS provided
- Contains a chat log displaying messages and notifications
- Different users' names will each be coloured differently
- Header will display the count of connected users
- When the number of connected users changes, this count will be updated for all connected users
- Contains an input field to change your name and an input field to send a message
- The client-side app communicates with a server via WebSockets for multi-user real-time updates
- No persistent database is involved; the focus is on the client-side experience

## Usage
Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000 on browser
```

## Tech Stack
- Webpack with Babel
- React, JSX, ES6, webpack dev server
- WebSockets using Node package ws on the server-side, and native WebSocket on client side
- Simple server using Express and WS