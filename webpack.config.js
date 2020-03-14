const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/testclient/client.js',
    resolve: {
        extensions: ['.js']
    },
    output: {
        path: path.resolve(__dirname, 'spec', 'web'),
        filename: 'test.js',
        library: 'testcase',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
            },
        ]
    },
    plugins: [],
};
