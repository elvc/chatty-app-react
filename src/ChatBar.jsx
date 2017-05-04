import React, { PropTypes, Component } from 'react';
// import PropTypes from 'prop-types'; // For React 16

export default class ChatBar extends Component {

  // propTypes validation
  static propTypes = {
    user: PropTypes.string.isRequired,
    addMessage: PropTypes.func.isRequired,
  }

  // defaultProps
  static defaultProps = {
    user: 'Anonymous'
  }

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      user: props.username
    }
  }

  submitUserChange = (event) => {
    if (event.key === 'Enter') {
      this.props.changeUser(this.state.user);
      event.target.value = '';
    }
  }

  submitPost = (event) => {
    if (event.key === 'Enter') {
      this.props.addMessage(this.state.content);
      this.setState({ content: '' });
    }
  }

  // combining all key change handler
  handleKeyChange = (key) => {
    return (event) => {
      this.setState({ [key]: event.target.value });
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder={this.props.username}
          onKeyPress={this.submitUserChange}
          onChange={this.handleKeyChange('user')} />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.submitPost}
          onChange={this.handleKeyChange('content')}
          value={this.state.content} />
      </footer>
    );
  }
}