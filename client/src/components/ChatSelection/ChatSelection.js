import React from 'react'
import { Link } from 'react-router-dom'
import "./ChatSelection.css";


function ChatSelection(){
    return(
        <>
    <div className="containerCards">
        <div className="holder">
            <Link to='/publicChat' className="mental"><h3>Public</h3></Link>
            <Link to='/private' className="physical"><h3>Private</h3></Link>
        </div>
    </div>
    </>
    )
}

export default ChatSelection