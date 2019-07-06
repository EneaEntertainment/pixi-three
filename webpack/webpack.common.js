const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports =
{
    entry:
    [
        '@babel/polyfill',
        path.resolve('src', 'index.js')
    ],

    output:
    {
        path     : path.resolve('_dist'),
        filename : 'bundle.js'
    },

    module:
    {
        rules:
        [
            {
                test    : /\.js$/,
                exclude : /node_modules/,
                use     :
                {
                    loader  : 'babel-loader',
                    options :
                    {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },

    resolve:
    {
        modules:
        [
            path.resolve('src'),
            'node_modules'
        ]
    },

    plugins:
    [
        new CopyWebpackPlugin(
            [
                { from: '**/**.*', context: 'assets' },
                { from: '**/*.{html,png,jpg,json}', context: 'src' }
            ])
    ]
};
