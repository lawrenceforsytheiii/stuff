let { resolve } = require('path');
let webpack = require('webpack');
const StorybookLoader = resolve(__dirname, '../stories/Utils/StoryBook.loader');

module.exports = {
  watch: true,
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  ],
  node: {
    fs: 'empty',
  },
  resolve: {
    alias: {
      '@lawrence/ui-lib/Icons': resolve(__dirname, '../src/components/Atoms/SvgIcons/dist'),
      '@lawrence/ui-lib': resolve(__dirname, '../src/components'),
      '@lawrence/autodoc-utils': resolve(__dirname, '../stories/Utils/AutoDocs'),
      '@lawrence/autodocs': resolve(__dirname, '../stories/Utils/AutoDocs/DocsComponents'),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      // SVG Loader - converts raw SVG files into react components
      // Renders native svg markup to allow css styling
      // https://www.npmjs.com/package/react-svg-loader
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true,
              svgo: {
                plugins: [
                  { removeTitle: false }
                ],
                floatPrecision: 2
              }
            }
          }
        ]
      },
      {
        test: /\.story\.js$/,
        include: resolve(__dirname, '../stories'),
        loader: StorybookLoader,
        options: {
          storyConfig: {
            moduleName: 'ui-lib',
            repoBaseURL: 'coming soon',
          }
        }
      },
      {
        test: /\.js$/,
        include: resolve(__dirname, '../node_modules/stringify-object/'),
        loader: 'babel-loader',
      }
    ],
  },
};
