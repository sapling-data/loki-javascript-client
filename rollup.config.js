import commonJs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/es-bundle.js',
      format: 'es',
      sourcemap: true,
      name: 'Loki',
    },
    plugins: [
      nodeResolve({ preferBuiltins: true, browser: true }),
      commonJs({
        include: 'node_modules/**',
      }),
      json(),
    ],
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/umd-bundle.js',
      format: 'umd',
      sourcemap: true,
      name: 'Loki',
    },
    plugins: [
      nodeResolve({ preferBuiltins: true, browser: false }),
      commonJs({
        include: 'node_modules/**',
      }),
      json(),
    ],
  },
];
