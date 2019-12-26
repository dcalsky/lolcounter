const Path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// require("html-loader");

module.exports = {
    entry: {
        app: Path.resolve(__dirname, '../src/scripts/main.js')
    },
    output: {
        path: Path.join(__dirname, '../build'),
        filename: 'js/[name].js'
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: false
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        // new CopyWebpackPlugin([
        //     {from: Path.resolve(__dirname, '../src/assets'), to: 'public'}
        // ]),
        new HtmlWebpackPlugin({
            favicon: Path.resolve(__dirname, '../src/assets/favicon.png'),
            template: Path.resolve(__dirname, '../src/assets/index.html')
        })
    ],
    resolve: {
        alias: {
            '~': Path.resolve(__dirname, '../src'),
            svelte: Path.resolve('node_modules', 'svelte')
        },
        extensions: ['.mjs', '.js', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main']
    },
    module: {
        rules: [
            {
                test: /\.(svelte)$/,
                use: {
                    loader: 'svelte-loader',
                    options: {
                        preprocess: require('svelte-preprocess')({ /* options */})
                    },
                },
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto'
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }
            },
        ]
    }
};
