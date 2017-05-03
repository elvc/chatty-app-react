import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const data = {
  currentUser: { name: "Bob" }, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: 1,
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      id: 2,
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = data;

    this.onPost = this.onPost.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
  }

// componentDidMount() {
//   console.log("componentDidMount <App />");
//   setTimeout(() => {
//     console.log("Simulating incoming message");
//     // Add a new message to the list of messages in the data store
//     const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
//     const messages = this.state.messages.concat(newMessage)
//     // Update the state of the app component.
//     // Calling setState will trigger a call to render() in App and all child components.
//     this.setState({messages: messages})
//   }, 3000);
// }

  onUserChange(user) {
    this.setState({ currentUser:{name: user}});
  }

  onPost(content){
    const nextId = this.state.messages.length + 1;
    const user = this.state.currentUser.name;
    const newMessage = {id: nextId, username: user, content: content};
    const messages = this.state.messages.concat(newMessage);
    this.setState({ messages: messages });
  }

  render() {
    console.log("Rendering <App />");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList allMessages={this.state.messages} />
        <ChatBar user={this.state.currentUser} onUserChange={this.onUserChange} onPost={this.onPost} />
      </div>
    );
  }
}