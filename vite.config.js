import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'  // <-- add this import
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),        // <-- add the React plugin here
    tailwindcss(),
  ],
})
