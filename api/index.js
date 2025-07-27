import fetch from 'node-fetch';
import { URL } from 'url';

// URL base de tu backend remoto
const BACKEND_URL = 'http://89.116.157.76:8762';

export default async function handler(request, response) {
    try {
        // 1. Obtener la URL completa de la solicitud entrante
        // 'request.url' en Vercel es la URL relativa, por ejemplo: '/api/ms-search/v1/items?page=1'
        const fullUrl = new URL(request.url, `http://${request.headers.host}`);
        const pathname = fullUrl.pathname;
        const searchParams = fullUrl.search;

        // 2. Construir la URL completa para el backend remoto
        // Se elimina el prefijo '/api' que Vercel añade
        const backendPath = pathname.startsWith('/api') ? pathname.substring(4) : pathname;
        const finalUrl = `${BACKEND_URL}${backendPath}${searchParams}`;

        console.log('Proxying request to:', finalUrl);

        // 3. Realizar la petición GET al backend remoto
        const backendResponse = await fetch(finalUrl);

        // Si la respuesta del backend no es exitosa, lanzar un error
        if (!backendResponse.ok) {
            const errorText = await backendResponse.text();
            throw new Error(`Backend request failed with status ${backendResponse.status}: ${errorText}`);
        }

        // 4. Copiar los headers y el body de la respuesta del backend
        // a la respuesta de tu API de Vercel
        const data = await backendResponse.json();

        // Puedes pasar otros headers si lo necesitas, por ejemplo, Content-Type
        response.setHeader('Content-Type', 'application/json');
        response.statusCode = backendResponse.status;
        response.end(JSON.stringify(data));

    } catch (error) {
        console.error('Error in proxy request:', error.message);
        response.statusCode = 500;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({ error: 'Internal Server Error', details: error.message }));
    }
}