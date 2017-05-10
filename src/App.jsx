import React, {
  Component
} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Counter from './Counter.jsx';

const data = {
  currentUser: {
    name: 'Anonymous'
  },
  messages: [],
  userCount: 0
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = data;
    this.socket;
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = (event) => console.log("Connected to server");
    // attach socket onmessage to imcomingMessage function
    this.socket.onmessage = this.incomingMessage;
  }

  // user name change and pass it to server
  changeUser = (user) => {
    const newMessage = {
      type: 'postNotification',
      content: `***${this.state.currentUser.name}*** changed their name to ***${user}***`
    };
    this.setState({
      currentUser: {
        name: user
      }
    });
    this.socket.send(JSON.stringify(newMessage));
  }

  // receive user submitted message and pass it to server
  addMessage = (content) => {
    const user = this.state.currentUser.name;
    const newMessage = {
      type: 'postMessage',
      username: user,
      content: content
    };

    // send message content as a JSON-formattted string to server
    this.socket.send(JSON.stringify(newMessage));
  }

  // message from server broadcast
  incomingMessage = (event) => {
    console.log('event', event);
    const msg = JSON.parse(event.data);
    switch (msg.type) {
      case "incomingMessage":
        // allow fall-through as this is doing the same thing
        // as "incomingNotification"

      case "incomingNotification":
        const messages = this.state.messages.concat(msg);
        this.setState({ messages: messages });
        break;

        // display user online counter
      case "userCount":
        this.setState({ userCount: msg.count });
        break;

      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type from server" + msg.type);
    }
  }

  render() {
    return (
      <div>
        <nav className='navbar'>
          <a href='/' className='navbar-brand'>Chatty</a>
          <Counter userCount={ this.state.userCount } />
        </nav>
        <MessageList allMessages={ this.state.messages } />
        <ChatBar
          username={ this.state.currentUser.name }
          changeUser={ this.changeUser }
          addMessage={ this.addMessage } />
      </div>
    );
  }
}
