import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // Forward /api/* and /uploads/* to your local PHP server.
      // Change the target if your XAMPP runs on a different port or path.
      '/api':     { target: 'http://localhost/medin', changeOrigin: true },
      '/uploads': { target: 'http://localhost/medin', changeOrigin: true },
    },
  },
})


// http://localhost/medin/api/setup-admin.php?email=admin@test.com&password=Admin1234