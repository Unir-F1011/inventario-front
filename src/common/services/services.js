async function DoRequest(url, method, body) {
    return await fetch(url, {
        method: method,
        body: JSON.parse(body)
    })
}

export default DoRequest
