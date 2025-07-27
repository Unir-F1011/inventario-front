const BACKEND_BASE = 'http://89.116.157.76:8762';

export default async function handler(req, res) {
    try {
        // Obtener el path dinámico que viene después de /api/proxy/
        const { path = [] } = req.query;
        const targetPath = Array.isArray(path) ? path.join('/') : path;

        const targetUrl = `${BACKEND_BASE}/${targetPath}${req.url.includes('?') ? req.url.split('?')[1] ? '?' + req.url.split('?')[1] : '' : ''}`;

        console.log('🔁 Proxying to:', targetUrl);

        // Excluir headers que no deberían reenviarse
        const { host, connection, 'content-length': _, ...forwardHeaders } = req.headers;

        const fetchOptions = {
            method: req.method,
            headers: forwardHeaders,
            body: ['GET', 'HEAD'].includes(req.method)
                ? undefined
                : typeof req.body === 'object'
                    ? JSON.stringify(req.body)
                    : req.body,
        };

        const response = await fetch(targetUrl, fetchOptions);

        res.status(response.status);

        // Pasar headers de vuelta al cliente
        response.headers.forEach((value, key) => {
            if (!['connection', 'keep-alive', 'transfer-encoding'].includes(key.toLowerCase())) {
                res.setHeader(key, value);
            }
        });

        // Enviar la respuesta según el tipo
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
            const data = await response.json();
            res.json(data);
        } else {
            const text = await response.text();
            res.send(text);
        }
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ error: 'Proxy failed', details: error.message });
    }
}

// Permitir que Next.js parsee JSON
export const config = {
    api: {
        bodyParser: true,
    },
};
