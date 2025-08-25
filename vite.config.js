import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import flowbiteReact from "flowbite-react/plugin/vite";

// Vite ya expone automáticamente todas las VITE_* de .env.* a import.meta.env
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [tailwindcss(), react(), flowbiteReact()],
    server: {
      port: 5173, // solo afecta "vite dev"; en docker nginx sirve en 80
    },
    // opcional: si quieres verificar en tiempo de build el valor
    define: {
      __VITE_API_URL__: JSON.stringify(env.VITE_API_URL ?? ""),
    },
  };
});
