import React, { useState, useEffect, useRef } from 'react'
import fetchJSON from '../../utils/API'
import './crypto.css'

function Crypto (){

    const [info, setInfo] = useState([])
    const [displayedList, setDisplayedList] = useState({
        results: [],
        sortOrder: ""
    })
    const cryptoInput = useRef()

    async function getData(){
        const temp = []

        const data = await fetchJSON('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest')
        console.log(data)
        data.data.forEach(a=>
            setInfo(info => [...info, {name: a.name.toLowerCase(), price: a.quote.USD, tags: a.tags}])
            )
        data.data.forEach(a=>
            temp.push({name: a.name.toLowerCase(), price: a.quote.USD, tags: a.tags}))
        setDisplayedList({results: temp})
    }

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
        setDisplayedList ({results: info})
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
        <div className="App">
            <input className="cryptoSearchInput" placeholder="Search Crypto" ref={cryptoInput} onKeyDown={submit.bind(this)}/>
            <button onClick={submitSearch}>search</button>
            <button onClick={reset}>Reset</button>
            <div className="cryptoContainer">
                
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
                                <td>{crypto.name.charAt(0).toUpperCase() + crypto.name.slice(1)}</td>
                                <td style={{color: 'white', opacity: '0.5'}}>${crypto.price.price.toFixed(2)} USD</td>
                                <td style={{color: Math.sign(crypto.price.percent_change_1h) != -1 ? 'green' : 'red'}}>{crypto.price.percent_change_1h.toFixed(2)}%</td>
                                <td style={{color: Math.sign(crypto.price.percent_change_7d) != -1 ? 'green' : 'red'}}>{crypto.price.percent_change_7d.toFixed(2)}%</td>
                                <td style={{color: Math.sign(crypto.price.percent_change_24h) != -1 ? 'green' : 'red'}}>{crypto.price.percent_change_24h.toFixed(2)}%</td>
                                <td style={{color: Math.sign(crypto.price.percent_change_30d) != -1 ? 'green' : 'red'}}>{crypto.price.percent_change_30d.toFixed(2)}%</td>
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