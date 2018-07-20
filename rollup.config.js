import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
export default {
    input: 'src/ribbon.js',
    output: {
        file: 'dist/ribbon.min.js',
        format: 'umd',
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        uglify()
    ]
}
