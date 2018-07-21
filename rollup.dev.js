import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
export default {
    input: 'index.js',
    output: {
        file: 'example/index.js',
        format: 'umd',
    }
}
