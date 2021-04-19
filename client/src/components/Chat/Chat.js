import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';
import { useStoreContext } from "../../utils/GlobalStore";

// const ENDPOINT = 'https://chatch4n.herokuapp.com/'
const ENDPOINT = 'localhost:3001'

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [{ rooms }, dispatch] = useStoreContext()

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users, room }) => {
      setUsers(users);
      dispatch({type: 'ADD_ROOM', data:room})
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="app">
      <div className="appBg">
      <div className="outerContainer">
          <InfoBar room={room} />
        <div className="all">
          <div className="usersContainer">
            <TextContainer users={users}/>
          </div>
          <div className="chatContainer">
              <Messages messages={messages} name={name} />
          </div>
          </div>
              <Input name={name} message={message} setMessage={setMessage} sendMessage={sendMessage} />
          
       
      </div>
      </div>
    </div>
  );
}

export default Chat;
