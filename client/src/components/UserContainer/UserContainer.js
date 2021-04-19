import React from 'react'

import './UserContainer.css'

function UserContainer({ users }){
    return (
        <>
    {
      users
        ? (
          <div>
            <div className="userNames">
                <h5 className="uH">Users</h5>
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
  </>
    )
}

export default UserContainer