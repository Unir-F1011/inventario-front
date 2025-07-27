const BACKEND_BASE = 'http://89.116.157.76:8762';

export default async function handler(req, res) {
    const { path = [] } = req.query;

    // Construir la URL base + path
    const pathname = path.join("/");

    // Agregar la query string (si hay)
    const searchParams = new URL(req.url, `http://${req.headers.host}`).search; // Extrae "?limit=10&page=2"
    const targetUrl = `${BACKEND_BASE}/${pathname}${searchParams}`;

    console.log("➡️ Proxy:", req.method, targetUrl);

    try {
        const response = await fetch(targetUrl, {
            method: req.method,
            headers: {
                ...req.headers,
                host: new URL(BACKEND_BASE).host
            },
            body: ["GET", "HEAD"].includes(req.method) ? undefined : req
        });

        const data = await response.arrayBuffer();
        res.status(response.status);

        for (let [key, value] of response.headers.entries()) {
            res.setHeader(key, value);
        }

        res.send(Buffer.from(data));
    } catch (error) {
        console.error("❌ Proxy error:", error);
        res.status(500).json({ error: "Proxy request failed" });
    }
}
