import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const data = {
  currentUser: { name: 'Anonymous' },
  messages: []
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = data;
    this.socket;
  }

  onUserChange = (user) => {
    this.setState({ currentUser: { name: user } });
  }

  // receive user submitted message and pass it to server
  addMessage = (content) => {
    const user = this.state.currentUser.name;
    const newMessage = { username: user, content: content };
    // send message content as a JSON-formattted string to server
    this.socket.send(JSON.stringify(newMessage));
  }

  // message from server broadcast
  incomingMessage = (event) => {
    const msg = JSON.parse(event.data);
    const messages = this.state.messages.push(msg);
    this.setState({ messages: messages });
  }

  componentDidMount() {
    const ws = new WebSocket('ws://localhost:3001');
    this.socket = ws;
    console.log('Connected to server');
    this.socket.onmessage = this.incomingMessage;
  }

  render() {
    return (
      <div>
        <nav className='navbar'>
          <a href='/' className='navbar-brand'>Chatty</a>
        </nav>
        <MessageList allMessages={this.state.messages} />
        <ChatBar user={this.state.currentUser} onUserChange={this.onUserChange} addMessage={this.addMessage} />
      </div>
    );
  }
}