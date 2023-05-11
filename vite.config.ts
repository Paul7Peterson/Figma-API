/// <reference types="vitest" />

import { resolve } from 'path';
import { defineConfig } from 'vite';
import typescript2 from 'rollup-plugin-typescript2';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    typescript2({
      check: false,
      include: ['src/**/*.ts'],
      tsconfigOverride: {
        compilerOptions: {
          outDir: '',
          sourceMap: true,
          declaration: true,
          declarationMap: true,
          removeComments: false,
        },
      },
      exclude: ['vite.config.ts'],
    }),
  ],
  build: {
    // minify: false,
    emptyOutDir: true,
    // sourcemap: true,
    // cssCodeSplit: true,
    outDir: resolve(__dirname, 'dist'),
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'FigmaAPI',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [],
      input: {
        main: resolve(__dirname, 'src/index.ts'),
      },
      output: {
        exports: 'named',
        globals: {},
      },
    },
  },
  define: {
    'process.env': process.env,
  },
  test: {
    globals: true,
    watch: false,
    reporters: [
      'verbose',
      'junit',
    ],
    outputFile: './junit.xml',
  },
});