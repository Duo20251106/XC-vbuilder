// import vue from '@vitejs/plugin-vue'
// import vueJsx from '@vitejs/plugin-vue-jsx'
// @ts-ignore
import { visualizer } from 'rollup-plugin-visualizer'
import veauryVitePlugins from 'veaury/vite/index.js'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
    base: '/xc-vbuilder/',
    plugins: [
        /*vue(), vueJsx(),*/ vueDevTools(),
        veauryVitePlugins({ type: 'vue' }),
        visualizer({ open: true })
    ],
    resolve: {
        alias: {
            '@': '/src'
        }
    },
    server: {
        port: 3000,
        proxy: {
            '/charts': {
                target: 'https://echarts.apache.org',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/charts/, '')
            }
        }
    },
    build: {
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (/(echarts|d3|zrender)/.test(id)) {
                            return 'charts'
                        }
                        return 'vendor'
                    }
                }
            }
        }
    }
})
