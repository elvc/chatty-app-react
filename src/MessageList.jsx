import React, { Component } from 'react';
import Message from './Message.jsx';

export default class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList />");
    const messages = this.props.allMessages.map((message) =>
      <Message key={message.id} username={message.username} content={message.content} />
    );
 
    return (
      // <div className="message system">
      <div className="messages">
        {messages}
      </div>
    );
  }
}