import React, { useState, useEffect, useRef } from 'react'
import { FaSearch, FaSort } from 'react-icons/fa'
import { AiOutlineReload } from 'react-icons/ai'
import { IoChevronBack } from 'react-icons/io5'
import fetchJSON from '../../utils/API'
import './crypto.css'

function Crypto (){

    const [info, setInfo] = useState([
        // {
        //     name: 'bitcoin', 
        //     price: {
        //         price: 48000.85,
        //         percent_change_1h: 0.15,
        //         percent_change_24h: -16.14,
        //         percent_change_7d: -2.90,
        //         percent_change_30d: -21.65,
        //     }
        // }
    ])
    const [displayedList, setDisplayedList] = useState({
        results: [
            // {
            //     name: 'bitcoin', 
            //     price: {
            //         price: 48000.85,
            //         percent_change_1h: 0.15,
            //         percent_change_24h: -16.14,
            //         percent_change_7d: -2.90,
            //         percent_change_30d: -21.65,
            //     }
            // }
        ],
        sortOrderName: "",
        sortOrderPrice: "",
        sortOrder1h: "",
        sortOrder24h: "",
        sortOrder7d: "",
        sortOrder30d: "",
    })
    const [loading, setLoading] = useState(false)
    const cryptoInput = useRef()

    async function getData(){
        const temp = []

        const data = await fetchJSON('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest')
        data.data.forEach(a=>
            setInfo(info => [...info, {name: a.name.toLowerCase(), price: a.quote.USD, tags: a.tags}])
            )
        data.data.forEach(a=>
            temp.push({name: a.name.toLowerCase(), price: a.quote.USD, tags: a.tags}))
        setDisplayedList({results: temp})
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

    const sortByName = () => {

        const sortedEmployees = displayedList.results.sort((a, b) => {
            if (b.name > a.name) {
                return -1
            }
            if (a.name > b.name) {
                return 1
            }
            return 0
        });
        if (displayedList.sortOrder === "descend") {
            sortedEmployees.reverse()
            setDisplayedList({ 
                results: sortedEmployees,
                sortOrderName: "ascend" 
            })
        } else {
            setDisplayedList({ 
                results: sortedEmployees,
                sortOrderName: "descend" 
            })
        }
    }
    const sortByPrice = () => {

        const sortedPrices = displayedList.results.sort((a, b) => {
            if (b.price.price > a.price.price) {
                return -1
            }
            if (a.price.price > b.price.price) {
                return 1
            }
            return 0
        });
        if (displayedList.sortOrderPrice === "ascend") {
            setDisplayedList({ 
                results: sortedPrices,
                sortOrderPrice: "descend" 
            })
        } else {
            sortedPrices.reverse()
            setDisplayedList({ 
                results: sortedPrices,
                sortOrderPrice: "ascend" 
            })
        }
    }
    const sortBy1h = () => {

        const sorted1h = displayedList.results.sort((a, b) => {
            if (b.price.percent_change_1h > a.price.percent_change_1h) {
                return -1
            }
            if (a.price.percent_change_1h > b.price.percent_change_1h) {
                return 1
            }
            return 0
        });
        if (displayedList.sortOrder1h === "ascend") {
            setDisplayedList({ 
                results: sorted1h,
                sortOrder1h: "descend" 
            })
        } else {
            sorted1h.reverse()
            setDisplayedList({ 
                results: sorted1h,
                sortOrder1h: "ascend" 
            })
        }
    }

    const sortBy24h = () => {

        const sorted24h = displayedList.results.sort((a, b) => {
            if (b.price.percent_change_24h > a.price.percent_change_24h) {
                return -1
            }
            if (a.price.percent_change_24h > b.price.percent_change_24h) {
                return 1
            }
            return 0
        });
        if (displayedList.sortOrder24h === "ascend") {
            setDisplayedList({ 
                results: sorted24h,
                sortOrder24h: "descend" 
            })
        } else {
            sorted24h.reverse()
            setDisplayedList({ 
                results: sorted24h,
                sortOrder24h: "ascend" 
            })
        }
    }

    const sortBy7d = () => {

        const sorted7d = displayedList.results.sort((a, b) => {
            if (b.price.percent_change_7d > a.price.percent_change_7d) {
                return -1
            }
            if (a.price.percent_change_7d > b.price.percent_change_7d) {
                return 1
            }
            return 0
        });
        if (displayedList.sortOrder7d === "ascend") {
            setDisplayedList({ 
                results: sorted7d,
                sortOrder7d: "descend" 
            })
        } else {
            sorted7d.reverse()
            setDisplayedList({ 
                results: sorted7d,
                sortOrder7d: "ascend" 
            })
        }
    }
    const sortBy30d = () => {

        const sorted30d = displayedList.results.sort((a, b) => {
            if (b.price.percent_change_30d > a.price.percent_change_30d) {
                return -1
            }
            if (a.price.percent_change_30d > b.price.percent_change_30d) {
                return 1
            }
            return 0
        });
        if (displayedList.sortOrder30d === "ascend") {
            setDisplayedList({ 
                results: sorted30d,
                sortOrder30d: "descend" 
            })
        } else {
            sorted30d.reverse()
            setDisplayedList({ 
                results: sorted30d,
                sortOrder30d: "ascend" 
            })
        }
    }

    async function update(){
        setLoading(true)
        await getData()
        setLoading(false)
    }
    return (
        <>
        <div className="cryptoBackground">
            <a href="/">
                <IoChevronBack className="backCrypto"/>
            </a>
        <div className="searchCont">
        <div>
            <input className="cryptoSearchInput" spellCheck='false' placeholder="Search Crypto" ref={cryptoInput} onKeyDown={submit.bind(this)}/>
            <button className="cryptoSearchBtn" onClick={submitSearch}><FaSearch/></button>
        </div>
        <div>
            <button className={loading ? "loadingBtn" : "cryptoResetBtn"} onClick={() => update()}><AiOutlineReload className="resetIcon"/></button>
        </div>
        </div>
            {/* {displayedList.results.length > 0 ?
            <table>
            <thead>
                <tr>
                    <th onClick={sortByName}>Name <FaSort/></th>
                    <th onClick={sortByPrice}>Price <FaSort/></th>
                    <th onClick={sortBy1h}>1h <FaSort/></th>
                    <th onClick={sortBy7d}>7d <FaSort/></th>
                    <th onClick={sortBy24h}>24h <FaSort/></th>
                    <th onClick={sortBy30d}>30d <FaSort/></th>
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
            : */}
            <div style={{margin: '40px auto', width: 'max-content'}}>
                <h3 style={{textAlign: 'center'}}>No data</h3>
                <h3>Fixing mobile issues</h3>
            </div>
            {/* } */}
        </div>
        </>
    )
}

export default Crypto