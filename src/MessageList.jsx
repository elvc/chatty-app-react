import React, { Component } from 'react';
import Message from './Message.jsx';

export default class MessageList extends Component {
  render() {
    const messages = this.props.allMessages.map((message) =>
      <Message 
        key={message.id} 
        username={message.username} 
        content={message.content} 
        color={message.color} />
    );
 
    return (
      <div className='messages'>
        {messages}
      </div>
    );
  }
}