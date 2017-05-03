import React, { Component } from 'react';

export default class Message extends Component {
  render() {
    console.log("Rendering <Message />");
    const { username, content } = this.props;
    return (
      <div className="message">
        <span className="message-username">{username}</span>
        <span className="message-content">{content}</span>
      </div>
    );
  }
}