# Etapa 1: Build de la app con Vite
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar los archivos necesarios
COPY package*.json ./
COPY vite.config.* ./
COPY . .

# Copiar archivo de entorno de producción
COPY .env.production .env.production

# Instalar dependencias
RUN npm install

# Build modo producción
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:stable-alpine

# Eliminar el contenido default de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar archivos de la app construida
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto
EXPOSE 5050

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
