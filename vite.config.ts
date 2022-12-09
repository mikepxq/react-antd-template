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
  const isGithub = env.VITE_MODE == 'github';
  return defineConfig({
    envDir,
    // envPrefix: ['VITE_'],
    base: isGithub || (isBuild && env.VITE_BASE) ? env.VITE_BASE : '/', //import.meta.env.BASE_URL
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
        localEnabled: isGithub || command !== 'build',
        //无论是否生产，只要isGithub 就使用
        prodEnabled: isGithub,
        injectFile: path.resolve(process.cwd(), './src/main.tsx'),
        //  这样可以控制关闭mock的时候不让mock打包到最终代码内
        injectCode: `import { setupProdMockServer } from '${path.resolve(
          process.cwd(),
          './mock/mockProdServer.ts'
        )}';setupProdMockServer();`,
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
