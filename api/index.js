// api/index.js

// Usamos 'node-fetch' si estás en un entorno Node.js < 18,
// de lo contrario, 'fetch' es nativo.
import fetch from 'node-fetch';
import { URL } from 'url';

// URL base de tu backend remoto
const BACKEND_URL = 'http://89.116.157.76:8762';

export default async function handler(request, response) {
    try {
        const fullUrl = new URL(request.url, `http://${request.headers.host}`);
        let backendPath = fullUrl.pathname;
        let searchParams = fullUrl.searchParams;

        if (backendPath.startsWith('/api')) {
            backendPath = backendPath.substring(4);
        }
        let finalUrl = `${BACKEND_URL}${backendPath}`;
        if (searchParams.toString()) {
            finalUrl += `?${searchParams.toString()}`;
        }

        let option = {}
        if (Object.keys(request?.body).length > 1 ) {
            option = {
                method: request.method,
                headers: request.headers,
                body: request.body ? JSON.stringify(request.body) : null
            }
        }else {
            option = {
                method: request.method,
                headers: request.headers,
            }
        }
        
        const backendResponse = await fetch(finalUrl, option);

        response.statusCode = backendResponse.status;
        backendResponse.headers.forEach((value, name) => {
            if (name.toLowerCase() !== 'content-encoding' && // Vercel/Node.js puede manejar la descompresión
                name.toLowerCase() !== 'connection' &&
                name.toLowerCase() !== 'transfer-encoding') {
                response.setHeader(name, value);
            }
        });

        // Leer el cuerpo de la respuesta del backend y enviarlo
        const responseBuffer = await backendResponse.arrayBuffer(); // Lee el cuerpo como un ArrayBuffer
        response.end(Buffer.from(responseBuffer)); // Envía el Buffer al cliente

    } catch (error) {
        console.error('[Proxy ERROR]:', error.message);
        let statusCode = 500;
        let details = error.message;

        // Intentar extraer el status code si es un error del backend
        if (error.message.includes('Backend request failed with status')) {
            const match = error.message.match(/status (\d+)/);
            if (match && match[1]) {
                statusCode = parseInt(match[1], 10);
                // Si hay un body de error, intentar parsearlo para detalles
                try {
                    details = JSON.parse(error.message.split(': ')[2]); // Asumiendo formato "status NNN: {json_body}"
                } catch (e) {
                    // No es JSON, usar el texto completo
                    details = error.message.split(': ')[2];
                }
            }
        }

        response.statusCode = statusCode;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({
            error: 'Proxy Error',
            details: details,
            targetUrl: BACKEND_URL,
            timestamp: new Date().toISOString()
        }));
    }
}