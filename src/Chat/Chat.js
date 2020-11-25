import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shop: {},
      messages: [],
    };
  }

  componentDidMount() {
    const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
    const messages = this.state.messages.concat(defaultMessage);

    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages,
      });
    }, 1000);
  }

  handleQuestion = (text) => {
    const customerMessage = { text, role: 'CUSTOMER' };
    this.setState(
      (state) => ({ messages: state.messages.concat(customerMessage) }),
      () => this.handleAnswer(text)
    );
  };

  handleAnswer = (question) => {
    const answers = [];
    answersData.forEach((item) => {
      const { tags } = item;
      for (let i = 0; i < tags.length; i += 1) {
        if (tags[i] !== 'DEFAULT' && question.includes(tags[i])) {
          answers.push(item);
          break;
        }
      }
    });

    for (let i = 0; i < answers.length; i += 1) {
      setTimeout(() => {
        this.setState((state) => ({ messages: state.messages.concat(answers[i]) }));
      }, (i + 1) * 1000);
    }
  };

  render() {
    const { shop, messages } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput handleQuestion={this.handleQuestion} />
      </main>
    );
  }
}

export default Chat;
