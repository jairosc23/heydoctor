import { defineConfig } from 'vite';
import { resolve } from 'path';

const projectRoot = __dirname;

export default defineConfig({
  root: resolve(projectRoot, 'public'),
  publicDir: false,
  resolve: {
    alias: {
      '/src': resolve(projectRoot, 'src'),
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
  envPrefix: 'VITE_',
  build: {
    outDir: resolve(projectRoot, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: [
        resolve(projectRoot, 'public/index.html'),
        resolve(projectRoot, 'public/login.html'),
        resolve(projectRoot, 'public/panel.html'),
      ],
    },
  },
});
