import React, { Component } from 'react';
import './ChatInput.scss';

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  handleChange = (event) => {
    this.setState({ text: event.target.value });
  };

  handleSend = (event) => {
    event.preventDefault();
    this.props.handleQuestion(this.state.text);
    this.setState({ text: '' });
  };

  render() {
    return (
      <footer className="ChatInput">
        <input type="text" value={this.state.text} onChange={this.handleChange} />
        <button type="button" onClick={this.handleSend}>
          Send
        </button>
      </footer>
    );
  }
}

export default ChatInput;
