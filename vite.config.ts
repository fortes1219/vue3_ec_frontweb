import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import eslintPlugin from 'vite-plugin-eslint'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'
import * as path from "path"

const env = (mode: string, env: string) => loadEnv(mode, process.cwd())[env]

export function configViteCompression() {
  return  viteCompression({
      verbose: true,
      disable: false,
      // 不壓縮的資源篩選
      // filter:()=>{},
      // 體積大於 threshold 才會開始被壓縮，單位: byte
      threshold: 1024 * 50,
      // 壓縮後刪除源頭檔案
      deleteOriginFile: false,
      // 壓縮的方法，可選的有 'gzip', 'brotliCompress', 'deflate', 'deflateRaw'
      algorithm: 'gzip',
      // 產生的壓縮檔副檔名
      ext: '.gz',
  })
}

export default({mode}: ConfigEnv) => defineConfig({
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src'),
      "/assets": path.resolve(__dirname, "src/assets/"),
      "/img": path.resolve(__dirname, "src/assets/img"),
      "/styles": path.resolve(__dirname, "src/styles/"),
      "/pages": path.resolve(__dirname, "src/pages/"),
    },
  },
  plugins: [
    vue(),
    visualizer({
      filename: "stats.html",
      title: "Rollup Visualizer",
      template: "treemap"
    }),
    AutoImport({
      resolvers: [
        ElementPlusResolver()
      ],
      dts: path.resolve(path.resolve(__dirname, 'src'), 'auto-imports.d.ts'),
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
      ],
      dts: path.resolve(path.resolve(__dirname, 'src'), 'components.d.ts')
    }),
    eslintPlugin({
      cache: false
    }),
    viteCompression()
  ],
  server: {
    // port: 3000,
    proxy: {
      '/api': {
        target: env(mode, 'VITE_BASE_API'),
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  build: {
    rollupOptions: {
      manualChunks(id) {
        if (id.includes('node_modules')) {
          if(id.toString().split('node_modules/')[1].split('/')[0].includes('element-plus')){
            return 'element-plus'
          } else {
            return 'vendor'
          }
        }
      },
      output: {
        chunkFileNames: "js/[name].[hash].js",
        entryFileNames: "js/[name].[hash].js",
        assetFileNames: (info) => {
          return `[name]-[hash].[ext]`;
        },
      }
    },
    minify: "terser",
    terserOptions: {
      compress: {
          drop_console: true,
          drop_debugger: true,
      },
    }
  },
  css: {
    devSourcemap: true
  }
})
