const MiniCssExtractPlugin = require("mini-css-extract-plugin");


exports.extractCSS = ({ options = {}, loaders = [] } = {}) =>{
    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        { loader: MiniCssExtractPlugin.loader, options },
                        "css-loader",
                    ].concat(loaders),
                    sideEffects: true,
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].min.css",
            }),
        ],
    };    
};