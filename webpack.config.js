module.exports = {
    devtool: 'source-map',
    entry: {
        'app':'./src/index.js',
    },
    output: {
        filename: 'dist/[name].js',
    },
    devServer: {
        port:80,
        inline: true
    }
}
