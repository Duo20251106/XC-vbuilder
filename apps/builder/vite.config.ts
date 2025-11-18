// import vue from '@vitejs/plugin-vue'
// import vueJsx from '@vitejs/plugin-vue-jsx'
// @ts-ignore
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import veauryVitePlugins from 'veaury/vite/index.js'
import { ConfigEnv, defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ command }: ConfigEnv) => {
    const isDev = command === 'serve'
    return {
        base: isDev ? '/' : '/XC-vbuilder/',
        plugins: [
            /*vue(), vueJsx(),*/ vueDevTools(),
            veauryVitePlugins({ type: 'vue' }),
            visualizer({ open: true }),
            AutoImport({
                resolvers: [ElementPlusResolver()]
            }),
            Components({
                resolvers: [ElementPlusResolver()]
            })
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
    }
})
