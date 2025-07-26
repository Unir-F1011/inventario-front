// /api/proxy/[...path].js

export default async function handler(req, res) {
    const { path = [] } = req.query;
    const query = req.url.includes('?') ? req.url.split('?')[1] : '';
    const fullUrl = `http://89.116.157.76:8762/${path.join('/')}${query ? `?${query}` : ''}`;

    try {
        const response = await fetch(fullUrl, {
            method: req.method,
            headers: {
                ...req.headers,
                host: '', // limpiar si causa conflicto
            },
            body:
                req.method !== 'GET' && req.method !== 'HEAD'
                    ? JSON.stringify(req.body)
                    : undefined,
        });

        const contentType = response.headers.get('content-type') || '';
        const body = contentType.includes('application/json')
            ? await response.json()
            : await response.text();

        res.status(response.status).send(body);
    } catch (err) {
        console.error('Proxy error →', fullUrl, err);
        res.status(500).json({ error: 'Proxy failed', details: err.message });
    }
}


