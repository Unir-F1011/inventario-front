// /api/proxy/[...path].js

export default async function handler(req, res) {
    const { path = [] } = req.query; // path es un array de segmentos
    const query = req.url.split('?')[1] || '';

    const backendUrl = `http://89.116.157.76:8762/${path.join('/')}${query ? `?${query}` : ''}`;

    try {
        const response = await fetch(backendUrl, {
            method: req.method,
            headers: {
                ...req.headers,
                host: '', // a veces es necesario limpiar este header
            },
            body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
        });

        const contentType = response.headers.get('content-type') || '';
        const body = contentType.includes('application/json')
            ? await response.json()
            : await response.text();

        res.status(response.status).send(body);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ error: 'Proxy failed' });
    }
}
