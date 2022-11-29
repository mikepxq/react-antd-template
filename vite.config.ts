import { ConfigEnv, defineConfig, loadEnv, UserConfigExport } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { viteMockServe } from 'vite-plugin-mock';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const envDir = './env';
  const env = loadEnv(mode, path.resolve(envDir), '');
  const isBuild = command == 'build';
  return defineConfig({
    envDir,
    // envPrefix: ['VITE_'],
    base: isBuild && env.VITE_BASE ? env.VITE_BASE : '/', //import.meta.env.BASE_URL
    server: {
      host: '0.0.0.0',
      // port: 3000,
      proxy: {
        '/l/api': {
          target: 'http://localhost:3500/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/l\/api/, 'api'),
        },
      },
    },
    plugins: [
      react(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command !== 'build',
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
        symbolId: 'icon-[dir]-[name]',
        inject: 'body-first',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    css: {
      preprocessorOptions: {},
    },
  });
};
