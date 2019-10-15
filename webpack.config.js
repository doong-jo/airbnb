const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: ["babel-polyfill", "./public/js/index.js"],
    output: {
        path: __dirname + "/public",
        filename: "app.bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(jpe?g|png|gif|ico)$/i,
                loader: "file?name=[name].[ext]"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "amazon-carousel",
            template: "./public/views/index.html",
            filename: "./index.html",
            favicon: "./public/favicon.ico"
        })
    ]
};
