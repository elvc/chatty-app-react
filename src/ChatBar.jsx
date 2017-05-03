import React, { PropTypes, Component } from 'react';
// import PropTypes from 'prop-types'; // For React 16

export default class ChatBar extends Component {

  // propTypes validation
  static propTypes = {
    user: PropTypes.object.isRequired,
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
      user: props.user.name
    }
  }

  submitUserChange = (event) => {
    this.props.onUserChange(this.state.user);
    this.setState({ user: this.state.user });
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
          placeholder={this.props.user.name}
          onBlur={this.submitUserChange}
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