function fetchJSON( url, method='get', data={} ){
    method = method.toLowerCase()
    const fetchOptions = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'X-CMC_PRO_API_KEY': 'b843b898-af9d-444c-b7bd-e6a955e842b8'
        }
    }
    if( method === 'post' || method === 'put' ) {
        fetchOptions.body = JSON.stringify( data ).toLowerCase()
    }
  
    return fetch( url,fetchOptions ).then( res=>res.json() )
}

export default fetchJSON