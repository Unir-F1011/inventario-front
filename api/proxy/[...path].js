// api/proxy/[...path].js

const BACKEND_BASE = "http://89.116.157.76:8762"; 

export default async function handler(req, res) {
    const { path = [] } = req.query;

    const query = req.url.includes('?') ? `?${req.url.split('?')[1]}` : '';
    const fullUrl = `${BACKEND_BASE}/${path.join('/')}${query}`;

    try {
        const response = await fetch(fullUrl, {
            method: req.method,
            headers: {
                ...req.headers,
                host: '', // Evita conflictos con host en servidores HTTP
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
