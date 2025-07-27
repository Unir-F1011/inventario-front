// api/proxy/[...path].js

const BACKEND_BASE = "http://89.116.157.76:8762"; 

export default async function handler(req, res) {    
    const urlObject = new URL(req.url, `http://${req.headers.host}`)
    const pathAndQuery = urlObject.pathname +  urlObject.search
    const clean = pathAndQuery.replace(/^\/api\/proxy/, '')
    const fullUrl = BACKEND_BASE + clean

    try {
        const response = await fetch(fullUrl, {
            method: req.method,
            headers: {
                ...req.headers,
                host: '', 
            },
            body:
                ['GET', 'HEAD'].includes(req.method)
                    ? undefined
                    : req.body
                        ? JSON.stringify(req.body)
                        : undefined,
        });

        // Copiar headers y status
        res.status(response.status);
        for (const [key, value] of response.headers.entries()) {
            res.setHeader(key, value);
        }

        const isJson = response.headers.get('content-type')?.includes('application/json');
        const body = isJson ? await response.json() : await response.text();

        res.send(body);
    } catch (err) {
        console.error('❌ Proxy error:', fullUrl, err);
        res.status(500).json({ error: 'Proxy failed', details: err.message });
    }
}
