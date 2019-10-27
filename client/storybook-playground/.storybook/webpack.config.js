module.exports = function({ config }) {
    config.module.rules.push({
        test: /\.stories\.jsx?$/,
        loaders: [require.resolve("@storybook/source-loader")]
    });

    return config;
};
