import { NextApiRequest, NextApiResponse } from 'next';

const BACKEND_BASE = 'http://89.116.157.76:8762';

export default async function handler(req, res) {
    try {
        const origin = `http://${req.headers.host}`;
        const urlObj = new URL(req.url, origin);
        const pathAndQuery = urlObj.pathname + urlObj.search;
        const cleanPath = pathAndQuery.replace(/^\/api\/proxy/, '');
        const targetUrl = BACKEND_BASE.replace(/\/$/, '') + cleanPath;

        const { host, connection, 'keep-alive': keepAlive, 'transfer-encoding': transfer, ...forwardHeaders } = req.headers;

        const fetchOptions = {
            method: req.method,
            headers: forwardHeaders,
            // Para GET/HEAD no enviamos body
            body: ['GET', 'HEAD'].includes(req.method)
                ? undefined
                : req.body && typeof req.body === 'object'
                    ? JSON.stringify(req.body)
                    : req.body,
        };

        const response = await fetch(targetUrl, fetchOptions);

        res.status(response.status);
        response.headers.forEach((value, key) => {
            if (!['connection', 'keep-alive', 'transfer-encoding'].includes(key.toLowerCase())) {
                res.setHeader(key, value);
            }
        });

    
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
            const json = await response.json();
            res.json(json);
        } else {
            const text = await response.text();
            res.send(text);
        }
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ error: 'Proxy failed', details: error.message });
    }
}
