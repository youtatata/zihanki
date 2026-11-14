import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const BACKEND_URL = 'http://127.0.0.1:8000'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // API と画像はバックエンドへ転送する（同一オリジン扱いになり CORS 設定が不要）
    proxy: {
      '/api': BACKEND_URL,
      '/uploads': BACKEND_URL,
    },
  },
})
