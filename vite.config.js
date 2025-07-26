import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react(), flowbiteReact()],
  server: {
    historyApiFallback: true, // Para que funcione correctamente BrowserRouter en desarrollo
    proxy:{
      '/api': {
        target:"http://89.116.157.76:8762",
        changeOrigin: true, 
        rewrite: (path) => path.replace(/^\/api/,'')
      }
    }
  },
})