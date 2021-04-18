import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import logo from '../../icons/AwesomeFace.png'

import fetchJSON from '../../utils/API'
import './Join.css';

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [rooms, setRooms] = useState([])

  const roomRef = useRef()

  useEffect(()=>{
    async function getData() {
      const data = await fetchJSON('/api/rooms')
      setRooms(data)
    }
    getData()
  }, [])

  function inputRoom(room) {
    roomRef.current.value = room
    setRoom(room)
  }

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <img src={logo} alt="logo" className="logo"></img>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" ref={roomRef} onChange={(event) => setRoom(event.target.value)} />
        </div>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={room.trim().toLowerCase() === 'galaxy' ? `/galaxy` : `/chat?name=${name}&room=${room}`}>
          <button className={'button mt-20'} type="submit">Join</button>
        </Link>
      </div>
      <div className="roomList">
        <h2 className="roomsHeader">Rooms</h2>
        <ul className="roomsUl">
        {rooms.sort((a,b)=>a.localeCompare(b)).map(( room, i ) => {
          return (
              <li key={i} onClick={()=>inputRoom(room)}>{room}</li>
          )
        })}
        </ul>
      </div>
    </div>
  );
}
