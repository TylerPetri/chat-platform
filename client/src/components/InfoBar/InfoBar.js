import React from 'react';

import closeIcon from '../../icons/closeIcon.png';
import fetchJSON from '../../utils/API'

import './InfoBar.css';

const InfoBar = ({ room }) => {

  function deleteRoom(){
    fetchJSON(`/api/rooms/${room}`, 'delete')
  }

  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/"><img src={closeIcon} alt="close icon" onClick={deleteRoom} /></a>
      </div>
    </div>
  );
}

export default InfoBar;