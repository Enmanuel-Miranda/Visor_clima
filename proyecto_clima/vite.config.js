import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom", // necesario para simular el DOM en tests
    setupFiles: "./src/setupTests.js", // archivo de configuración
  },
})
