import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), AutoImport({
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    resolvers: [ElementPlusResolver()],
  }),],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'lib': fileURLToPath(new URL('./lib', import.meta.url))
    },
  },
  build: {
    outDir: 'zlvue',
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'zlvue',
      fileName: 'zlvue'
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    }

  }
})
