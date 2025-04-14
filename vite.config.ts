import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    build: {
        target: 'ESNext'
    },
    server: {
        // 这里配置了代理，需要配合后端的set-cookie的domain
        host: '0.0.0.0',
        port: 5173,
        proxy: {
            '/auth': {
                target: 'http://localhost:4800',
                changeOrigin: true,
                ws: true,
                rewrite: (path: string) => path.replace(/^\/auth/, '')
            }
        }
    }
});
