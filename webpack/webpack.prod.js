const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Terser = require('terser-webpack-plugin');

/* eslint-disable camelcase */
module.exports = merge(common,
    {
        mode: 'production',

        plugins:
        [
            new CleanWebpackPlugin(
                [
                    '_dist'
                ],

                {
                    root: path.resolve(__dirname, '../')
                }),

            new Terser(
                {
                    extractComments: true,

                    sourceMap: false,

                    terserOptions:
                    {
                        ecma     : 5,
                        warnings : false,
                        parse    : {},
                        compress :
                        {
                            drop_console: true
                        },
                        mangle          : true,
                        module          : false,
                        output          : null,
                        toplevel        : false,
                        nameCache       : null,
                        ie8             : false,
                        keep_classnames : undefined,
                        keep_fnames     : false,
                        safari10        : false
                    }
                })
        ],

        performance:
        {
            hints: false
        }
    });
