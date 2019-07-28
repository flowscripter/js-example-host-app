import cleanup from 'rollup-plugin-cleanup';
import commonjs from 'rollup-plugin-commonjs';
// TODO: fix linting on dynamic import
import { eslint } from 'rollup-plugin-eslint';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';

module.exports = {
    input: {
        index: 'src/index.js'
    },
    output: {
        dir: 'dist',
        format: 'es',
        sourcemap: true
    },
    watch: {
        include: 'src/**',
    },
    external: [
        'tty',
        'util',
        'os',
        'fs',
        'path',
        'crypto'
    ],
    plugins: [
        peerDepsExternal(),
        commonjs(),
        resolve(),
        cleanup({ extensions: ['js'] })
    ]
};
