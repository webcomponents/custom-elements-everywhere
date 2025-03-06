import { defineConfig } from 'vite';
import { extensions, ember } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';

const validator = `${process.cwd()}/node_modules/ember-source/dist/packages/@glimmer/validator/index.js`;
const tracking = `${process.cwd()}/node_modules/ember-source/dist/packages/@glimmer/tracking/index.js`;
const eUtil = `${process.cwd()}/node_modules/@embroider/util/addon/index.js`;
const cache = `${process.cwd()}/node_modules/ember-source/dist/packages/@glimmer/tracking/primitives/cache.js`;

export default defineConfig({
  build: {
    target: ['esnext'],
  },
  resolve: {
    extensions,
    alias: {
      '@glimmer/validator': validator,
      '@glimmer/tracking/primitives/cache': cache,
      '@glimmer/tracking': tracking,
      '@embroider/util': eUtil,
    },
  },
  plugins: [
    ember(),
    babel({
      babelHelpers: 'runtime',
      extensions,
    }),
  ],
});
