import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  server: {
    open: true,
  },
  base: './',
  build: {
    outDir: './docs',
  },
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'Todo App - PWA', // ユーザーに通常表示されるアプリ名
        short_name: 'Todo', // name を表示するのに十分なスペースがない場合に表示されるアプリ名
        start_url: '.', // アプリの開始URL
        description: 'Todo プログレッシブ・ウェブアプリ', // アプリの詳細な説明
        display: 'standalone', // 表示モード(standalone: 単独のアプリのような表示)
        orientation: 'portrait', // アプリの向き(portrait: 縦向き)
        theme_color: '#3f51b2', // テーマカラー
        background_color: '#efeff4', // スタイルシートが読み込まれる前に表示するアプリページの背景色
        icons: [
          // favicon やアプリアイコンの配列
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icon-512x512-mask.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable', // 用途をマスカブルアイコンとする
          },
        ],
      },
    }),
  ],
});
