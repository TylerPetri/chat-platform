function fetchJSON( url, method='get', data={} ){
    method = method.toLowerCase()
    const fetchOptions = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'X-CMC_PRO_API_KEY': ''
        }
    }
    if( method === 'post' || method === 'put' ) {
        fetchOptions.body = JSON.stringify( data ).toLowerCase()
    }
  
    return fetch( url,fetchOptions ).then( res=>res.json() )
}

export default fetchJSON