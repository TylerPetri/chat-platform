import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import logo from '../../icons/AwesomeFace.png'
import { AiOutlineReload } from 'react-icons/ai'
import { GiSandSnake } from 'react-icons/gi'
import psg from '../../assets/playsnakegame.PNG'

import fetchJSON from '../../utils/API'
import './Join.css';

function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [rooms, setRooms] = useState(['galaxy', 'shit 4chan says', 'literature', 'paranormal', 'siblings'])
  // const [counts, setCounts] = useState({})

  const roomRef = useRef()

  useEffect(()=>{
    async function getData() {
      // var counts = {}
      const data = await fetchJSON('/api/rooms')
      const names = data.map(({room})=> {return (room.replace(/['"]+/g, ''))})
      // rooms.map(function(x) {counts[x] = (counts[x] || 0)+1})
      names.push('galaxy', 'shit 4chan says', 'literature', 'paranormal', 'siblings')
      // setCounts('galaxy', 'shit 4chan says', 'literature', 'paranormal', 'siblings')
      setRooms(names)
    }
    getData()
  }, [])

  async function refreshList() {
    // var counts = {}
    const data = await fetchJSON('/api/rooms')
    const names = data.map(({room})=> {return (room.replace(/['"]+/g, ''))})
    // rooms.map(function(x) {counts[x] = (counts[x] || 0)+1})
    // setCounts(counts)
    names.push('galaxy', 'shit 4chan says', 'literature', 'paranormal', 'siblings')
    setRooms(names)
  }

  function inputRoom(room) {
    roomRef.current.value = room.charAt(0).toUpperCase() + room.slice(1)
    setRoom(room)
  }

  async function post(){
    const data = roomRef.current.value
    if(name.length > 0 && room.length > 0) {await fetchJSON('/api/rooms', 'post', {data})}
  }

  const aUsers = rooms.length-2

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
          <button className={'button mt-20'} onClick={post}>{rooms.includes(room.trim().toLowerCase()) ? 'Join' : 'Create'}</button>
        </Link>
        <Link to="/snake-game">
          <button className="playsnakeBTN">
            <GiSandSnake className="snakeIcon"/>
            <img src={psg} alt="play snake game"></img>
            <GiSandSnake className="snakeIcon"/>
          </button>
        </Link>
      </div>
      <div className="roomList">
        <div className="containerHead">
          <button to="/" style={{visibility: 'hidden', padding: '10px'}}><AiOutlineReload/></button>
          <h2 className="roomsHeader">Public Rooms</h2>
          <button className="reloadBtn" 
          onClick={refreshList}
          ><AiOutlineReload/></button>
        </div>
          <h4>{aUsers} active users</h4>
        <ul className="roomsUl">
        {rooms
          .sort((a,b)=>a.localeCompare(b))
          .filter(function(item,pos){return rooms.indexOf(item) === pos})
          .map(( room, i ) => {
            return (
                <li key={i} onClick={()=>inputRoom(room)}>{room.charAt(0).toUpperCase() + room.slice(1)}</li>
            )
        })}
        </ul>
      </div>
    </div>
  );
}

export default SignIn