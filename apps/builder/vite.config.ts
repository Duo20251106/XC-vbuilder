import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
    plugins: [vue(), vueJsx(), vueDevTools()],
    resolve: {
        alias: {
            '@': '/src'
        }
    },
    server: {
        proxy: {
            '/charts': {
                target: 'https://echarts.apache.org',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/charts/, '')
            }
        }
    }
})
