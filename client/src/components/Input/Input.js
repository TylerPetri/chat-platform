import React from 'react';
import { RiSendPlane2Fill } from 'react-icons/ri'

import './Input.css';

const Input = ({ name, setMessage, sendMessage, message }) => (
  <form className="form">
    <h3 className="chatName">{name.substring(0,10)}<span style={{color: 'rgb(47, 255, 75)', paddingLeft: '4px', fontWeight: 'bold'}}> - - > </span></h3>
    <input
      spellCheck="false"
      className="input"
      type="text"
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="sendButton" onClick={e => sendMessage(e)}><RiSendPlane2Fill className="sendIcon"/></button>
  </form>
)

export default Input;