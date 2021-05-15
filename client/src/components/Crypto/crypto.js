import React, { useState, useEffect, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
import { AiOutlineReload } from 'react-icons/ai'
import fetchJSON from '../../utils/API'
import './crypto.css'

function Crypto (){

    const [info, setInfo] = useState([{
        name: 'bitcoin', 
        price: {
            price: 48000.85,
            percent_change_1h: 0.15,
            percent_change_24h: -16.14,
            percent_change_7d: -2.90,
            percent_change_30d: -21.65,
        }
    }])
    const [displayedList, setDisplayedList] = useState({
        results: [{
            name: 'bitcoin', 
            price: {
                price: 48000.85,
                percent_change_1h: 0.15,
                percent_change_24h: -16.14,
                percent_change_7d: -2.90,
                percent_change_30d: -21.65,
            }
        }],
        sortOrder: ""
    })
    const cryptoInput = useRef()

    async function getData(){
        const temp = []

        // const data = await fetchJSON('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest')
        // data.data.forEach(a=>
        //     setInfo(info => [...info, {name: a.name.toLowerCase(), price: a.quote.USD, tags: a.tags}])
        //     )
        // data.data.forEach(a=>
        //     temp.push({name: a.name.toLowerCase(), price: a.quote.USD, tags: a.tags}))
        // setDisplayedList({results: temp})
    }

    useEffect(() => {
        getData()
    }, [])

    function submitSearch(event){
        event.preventDefault()
        let temp = info

        const data = cryptoInput.current.value.trim().toLowerCase();
        const filter = temp.filter(a => a.name === data)
        setDisplayedList({results: filter})
        cryptoInput.current.value = ""
    }

    function submit(event){
        if (event.key === "Enter") {
            submitSearch(event)
        }
    }

    function reset(){
        getData()
        setDisplayedList ({results: info})
    }

    return (
        <>
        <div className="App">
        <div className="cryptoContainer">
            <div className="searchCont">
            <div>
                <input className="cryptoSearchInput" spellCheck='false' placeholder="Search Crypto" ref={cryptoInput} onKeyDown={submit.bind(this)}/>
                <button className="cryptoSearchBtn" onClick={submitSearch}><FaSearch/></button>
            </div>
            <div>
                <button className="cryptoResetBtn" onClick={reset}><AiOutlineReload className="resetIcon"/></button>
            </div>
            </div>
                {displayedList.results.length > 0 ?
                <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>1h</th>
                        <th>7d</th>
                        <th>24h</th>
                        <th>30d</th>
                    </tr>
                </thead>
                {displayedList.results.map((crypto, idx) => {
                    return (
                        <tbody key={idx}>
                            <tr>
                                <td className="tdName">{crypto.name.charAt(0).toUpperCase() + crypto.name.slice(1)}</td>
                                <td style={{color: 'white', opacity: '0.5'}}>${crypto.price.price.toFixed(2)} USD</td>
                                <td style={{color: Math.sign(crypto.price.percent_change_1h) != -1 ? 'rgb(0, 250, 0, 0.9)' : 'red'}}>{crypto.price.percent_change_1h.toFixed(2)}%</td>
                                <td style={{color: Math.sign(crypto.price.percent_change_7d) != -1 ? 'rgb(0, 250, 0, 0.9)' : 'red'}}>{crypto.price.percent_change_7d.toFixed(2)}%</td>
                                <td style={{color: Math.sign(crypto.price.percent_change_24h) != -1 ? 'rgb(0, 250, 0, 0.9)' : 'red'}}>{crypto.price.percent_change_24h.toFixed(2)}%</td>
                                <td style={{color: Math.sign(crypto.price.percent_change_30d) != -1 ? 'rgb(0, 250, 0, 0.9)' : 'red'}}>{crypto.price.percent_change_30d.toFixed(2)}%</td>
                            </tr>
                        </tbody>
                    )
                })}
                </table>
                :
                <h3>No data</h3>
                }
            </div>
        </div>
        </>
    )
}

export default Crypto