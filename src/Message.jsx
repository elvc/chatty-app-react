import React, { Component } from 'react';

export default class Message extends Component {
  render() {
    const { username, content, color } = this.props;

    // display jpg, png, gif photos if the URL is valid. Otherwise will display plaintext
    return (
      <div className='message'>
        <span className='message-username' style={ {color} }>{username}</span>
          { /(https?:\/\/.*\.(?:png|jpg|gif))/i.test(content) ?
            <span className='message-content'><img src={content} width='60%' /></span> :
            <span className='message-content'>{content}</span> }
      </div>
    );
  }
}
