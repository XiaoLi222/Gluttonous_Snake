const Htmlwebpackplugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
    entry: "./src/TS/index.ts",
    output: {
        //指定打包文件的目录
        path: path.resolve(__dirname, "dist"),
        filename:"bundle.js"
    },
    module: {
        rules: [
            //匹配css文件
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            //匹配less文件
            // {
            //     test: /\.less$/,
            //     use: [
            //         "style-loader",
            //         "css-loader",
            //         "less-loader"
            //     ],
            // },
            //匹配ts文件
            {
                test: /\.ts$/,
                use: [
                    {
                        //设置babel
                        loader: 'babel-loader',
                        options: {
                            //设置预定义环境
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        //要兼容的目标浏览器
                                        targets:{
                                            "chrome": "58",
                                            "ie":"8"
                                        },
                                        //指定corejs
                                        "corejs": "3",
                                        //使用corejs的方式"usage"表示按需加载
                                        "useBuiltIns": "usage"
                                    },
                                ],
                            ],
                        },
                    },
                    "ts-loader"
                ],
                //要排除的文件
                exclude:/node-module/
            },
        ],
    },
    resolve: {
        extensions:['.ts','.js']
    },
    plugins: [
        new Htmlwebpackplugin({
            template:'./public/index.html'
        })
    ],
    //模式
    mode: "development",
}