import builtins from 'rollup-plugin-node-builtins';
import cleanup from 'rollup-plugin-cleanup';
import commonjs from 'rollup-plugin-commonjs';
// TODO: fix linting on dynamic import
import { eslint } from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';

module.exports = [
    {
        input: {
            nodeEntryPoint: 'src/nodeEntryPoint.js'
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
            'crypto',
            'fs',
            'os',
            'path',
            'tty',
            'util'
        ],
        plugins: [
            eslint({
                include: [
                    'src/**/*.js'
                ]
            }),
            commonjs(),
            resolve(),
            resolve({
                preferBuiltins: true
            }),
            cleanup({
                extensions: [
                    'js'
                ]
            })
        ]
    },
    {
        input: {
            browserEntryPoint: 'src/browserEntryPoint.js'
        },
        output: {
            dir: 'dist',
            format: 'es',
            sourcemap: true
        },
        watch: {
            include: 'src/**',
        },
        plugins: [
            eslint({
                include: [
                    'src/**/*.js'
                ]
            }),
            commonjs(),
            builtins(),
            resolve({
                browser: true,
                preferBuiltins: false
            }),
            cleanup({
                extensions: [
                    'js'
                ]
            })
        ]
    }
];
