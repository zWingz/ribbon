import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import pkg from './package.json'
export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'ribbon'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    uglify()
  ]
}
