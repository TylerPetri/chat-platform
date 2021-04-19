import React from 'react';

import closeIcon from '../../icons/closeIcon.png';
import fetchJSON from '../../utils/API'
import { useStoreContext } from '../../utils/GlobalStore'
import { FaUsers } from 'react-icons/fa'

import './InfoBar.css';

const InfoBar = ({ room }) => {

  const [{ nav }, dispatch] = useStoreContext()

  function deleteRoom(){
    fetchJSON(`/api/rooms/${room}`, 'delete')
  }

  function toggle(){
    !nav ? dispatch({type:'NAV_OPEN'}) : dispatch({type:'NAV_CLOSE'})
  }

  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <h3>{room.substring(0,10)}</h3>
      <button className="asdf">
        <FaUsers className="userIcon" onClick={toggle}/>
      </button>
      </div>
     
      <div className="rightInnerContainer">
        <a href="/"><img src={closeIcon} alt="close icon" onClick={deleteRoom} /></a>
      </div>
    </div>
  );
}

export default InfoBar;