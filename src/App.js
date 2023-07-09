import React, { Component } from 'react';

import Picker from "emoji-picker-react";

import { BsFillEmojiSmileFill } from "react-icons/bs";


import {formatDistanceToNow} from 'date-fns'



import './App.css';

const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

class App extends Component {
  
state = {
      message: '',
      chatMessages: [],
      showEmojiPicker: false,
      msgEmoji:''
    };

  handleInputChange = (event) => {
    this.setState({
      message: event.target.value
    });
  };

  // handleEmojiClick = (event, emojiObject) => {
  //   this.setState({ selectedEmoji: emojiObject.emoji });
  // };

  handleSendMessage = () => {
    const { message, chatMessages } = this.state;

    if (message !== '') {
      const randomUser = user_list[Math.floor(Math.random() * user_list.length)];
      const newMessage = {
        user: randomUser,
        text: message,
        likes: 0,
        date: new Date(),
      };

      this.setState({
        chatMessages: [...chatMessages, newMessage],
        message: ''
      });
    }
  };

  handleLike = (index) => {
    const { chatMessages } = this.state;
    const updatedMessages = chatMessages.map((msg, i) => {
      if (i === index) {
        return {
          ...msg,
          likes: msg.likes + 1
        };
      }
      return msg;
    })
    this.setState({
      chatMessages: updatedMessages
    });
  };

  handleEmojiPickerhideShow = () => {
    this.setState(prevStaet=>({showEmojiPicker:!prevStaet.showEmojiPicker}));
  };


  handleEmojiClick = (event, emojiObject) => {
    const {msgEmoji}=this.state
    let messageItem = msgEmoji;
    messageItem += emojiObject.emoji;
    this.setState({msgEmoji:messageItem})
   console.log(msgEmoji)
  };

  render() {
    const { message, chatMessages,showEmojiPicker} = this.state;

    return (
      <div className="App">
        <ul className="ChatMessages">
          {chatMessages.map((msg, index) => (
            <li key={index} className="Message">
              <div className="profile-user">
                 <p className="slice-user">{msg.user[0]}</p>
              </div>
              <span className="Username">{msg.user}</span>
              <div className="comment-time">
              <div className="container-comment">
              <p  className="TextElement"> 
                  {msg.text}
              </p>
              </div>    
              <p className="time">{formatDistanceToNow(msg.date)} ago</p>
</div>
              <button className="LikeButton" onClick={() => this.handleLike(index)}>
                Like ({msg.likes})
              </button>
              </li>
          ))}
        </ul>
        <div className="ChatInput">
          <input
            type="text"
            placeholder="Type your message"
            value={message}
            onChange={this.handleInputChange}
          />

          <div className="emoji">
          <BsFillEmojiSmileFill onClick={this.handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={this.handleEmojiClick} />}
        </div>
        
          <button className="button-count" onClick={this.handleSendMessage}>Send</button>
        </div>
      </div>
    );
  }
}

export default App;
