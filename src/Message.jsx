import React, { Component } from 'react';

export default class Message extends Component {
  render() {
    const { username, content, color} = this.props;
    return (
      <div className="message">
        <span className="message-username" style={ {color} }>{username}</span>
        <span className="message-content">{content}</span>
      </div>
    );
  }
}