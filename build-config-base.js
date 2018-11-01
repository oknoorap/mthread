import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
// import { terser as uglify } from 'rollup-plugin-terser'

export default {
  input: './src/main.js',
  output: {
    file: './dist/mthread.js',
    name: 'MultiThread',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    nodeResolve({
      jsnext: true,
      preferBuiltins: false
    }),
    babel()
  ]
}
