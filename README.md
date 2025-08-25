# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Producción: reverse proxy para `VITE_API_URL=/api`

En desarrollo usamos Vite para proxy/rewrite (`/api` → Gateway).  
En **producción** se debe replicar comportamiento en capa de entrada (**Nginx o ALB**).

### Opción A — Nginx (manteniendo prefijo `/api`)

- Termina TLS en Nginx (HTTPS).
- Reescribe `^/api/(.*)$` → `/$1` y reenvía al Gateway (puerto 8762).
- **No** agregues CORS en Nginx; CORS se maneja **en el Gateway**.

nginx
server {
listen 443 ssl http2;
server_name api.tu-dominio.com;

# TLS (certificados)

ssl_certificate /etc/nginx/certs/fullchain.pem;
ssl_certificate_key /etc/nginx/certs/privkey.pem;

# (Opcional) Servir el front estático:

# location / {

# root /usr/share/nginx/html;

# try_files $uri /index.html;

# }

# Proxy al Gateway QUITANDO el prefijo /api (ojo al slash final):

location /api/ {
proxy_pass http://ms-cloud-gateway:8762/; # <-- elimina /api/
proxy_set_header Host $host;
proxy_set_header X-Forwarded-For $remote_addr;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_http_version 1.1;
}

# No añadir cabeceras CORS aquí; el Gateway ya las gestiona.

}

Frontend (prod):

VITE_API_URL=/api
El navegador llamará a /api/..., Nginx reescribe y reenvía al Gateway.

### Opción B — AWS ALB (sin reescritura de path)

ALB no reescribe paths por sí solo.

B1) Sin prefijo /api en prod

En Vercel/Env prod:

VITE_API_URL=https://api.tu-dominio.com
El front llamará directo a https://api.tu-dominio.com/ms-search/...

ALB solo hace forward al Target Group del Gateway (8762).

B2) Mantener /api con ALB

Coloca Nginx detrás del ALB (ALB → Nginx → Gateway) y realiza la reescritura en Nginx (ver Opción A).
(Alternativas más complejas: CloudFront/Lambda@Edge para reescritura.)
