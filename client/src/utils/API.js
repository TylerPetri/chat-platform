function fetchJSON( url, method='get', data={} ){
    method = method.toLowerCase()
    const fetchOptions = {
        method,
        headers: {
            'Content-Type': 'application/json',
        }
    }
    if( method === 'post' || method === 'put' ) {
        fetchOptions.body = JSON.stringify( data )
    }
  
    return fetch( url,fetchOptions ).then( res=>res.json() )
}

export default fetchJSON