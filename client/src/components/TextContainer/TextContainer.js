import React from 'react';

import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    {
      users
        ? (
          <div>
            <div className="activeContainer">
              <h3>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name.substring(0,10).charAt(0).toUpperCase() + name.slice(1)}
                  </div>
                ))}
              </h3>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;