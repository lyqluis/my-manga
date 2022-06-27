import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import content from '@originjs/vite-plugin-content'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    content(/* options */),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  // css: {
  //   /* CSS 预处理器 */
  //   preprocessorOptions: {
  //     scss: {
  //       // additionalData: `@import "src/assets/scss/reset.scss";@import "src/assets/scss/base.scss";`
  //     }
  //   }
  // }
})