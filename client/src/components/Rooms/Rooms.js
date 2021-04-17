import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './Rooms.css';

const RoomContainer = ({ rooms }) => (
  <div className="roomContainer">
    {
      rooms
        ? (
          <div>
            <div className="activeContainer">
              <h2>
                {rooms.map(({room}) => (
                  <div key={room} className="activeItem">
                    {room}
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default RoomContainer;