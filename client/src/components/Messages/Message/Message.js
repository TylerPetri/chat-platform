import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyStart">
          <p className="sentText">{trimmedName.substring(0,10).charAt(0).toUpperCase() + trimmedName.slice(1)}</p>
          <div className="messageBox">
            <p className="messageTextSend">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <p className="sentText">{user.substring(0,10).charAt(0).toUpperCase() + user.slice(1)}</p>
            <div className="messageBox">
              <p className="messageTextReceive">{ReactEmoji.emojify(text)}</p>
            </div>
          </div>
        )
  );
}

export default Message;