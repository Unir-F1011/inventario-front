async function DoRequest(url, method = 'GET', body = null) {
    const opts = {
        method,
        headers: {
            "Content-Type": "application/json",
            "Accept":"*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Connection": "keep-alive"
        }
    };

    if (body !== null) {
        opts.body = JSON.stringify(body);
    }

    return await fetch(url, opts)
}

export default DoRequest;
