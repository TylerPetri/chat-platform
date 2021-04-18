import React from 'react'
import ReactPlayer from 'react-player'
import { AiOutlineDown } from 'react-icons/ai'
import Aquaman from '../../icons/Aquaman1.jpg'

import './Galaxy.css'

function Galaxy(){
    return(
        <div className="appGal">
            <div className="appBgGal">
                <ReactPlayer 
                className="galaxyVid"
                url="https://www.youtube.com/watch?v=Z6FPJOgfCkc&list=RDZ6FPJOgfCkc&start_radio=1"
                // playing={true}
                width='70%'
                // alt="Galaxy supernova by girls generation"
                />
                <div className="downdown"><AiOutlineDown/><AiOutlineDown/><AiOutlineDown/><AiOutlineDown/></div>
                <img src={Aquaman} alt="Aquaman" className="aquapic"/>
            </div>
        </div>
    )
}

export default Galaxy