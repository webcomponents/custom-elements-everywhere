import { defineConfig } from 'vite';
import { extensions, ember } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';

export default defineConfig({
  build: {
    target: ['esnext'],
  },
  resolve: {
    extensions,
  },
  plugins: [
    ember(),
    babel({
      babelHelpers: 'runtime',
      extensions,
    }),
  ],
});
