import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import logo from '../../icons/AwesomeFace.png'

import fetchJSON from '../../utils/API'
import './Join.css';

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [rooms, setRooms] = useState([])
  const [counts, setCounts] = useState({})

  const roomRef = useRef()

  useEffect(()=>{
    async function getData() {
      var counts = {}
      const data = await fetchJSON('/api/rooms')
      const names = data.map(({room})=> {return (room.replace(/['"]+/g, ''))})
      rooms.map(function(x) {counts[x] = (counts[x] || 0)+1})
      setCounts(counts)
      names.push('Galaxy', 'Shit 4chan says', 'Literature', 'Paranormal', 'Siblings')
      setRooms(names)
    }
    getData()
  }, [])

  function inputRoom(room) {
    roomRef.current.value = room
    setRoom(room)
  }

  async function post(){
    const data = roomRef.current.value
    await fetchJSON('/api/rooms', 'post', {data})
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
          <button className={'button mt-20'} type="submit" onClick={post}>Join</button>
        </Link>
      </div>
      <div className="roomList">
          <h2 className="roomsHeader">Public Rooms</h2>
          <h4>{rooms.length} active users</h4>
        <ul className="roomsUl">
        {rooms
          .sort((a,b)=>a.localeCompare(b))
          .filter(function(item,pos){return rooms.indexOf(item) == pos})
          .map(( room, i ) => {
            return (
                <li key={i} onClick={()=>inputRoom(room)}>{room}</li>
            )
        })}
        </ul>
      </div>
    </div>
  );
}
