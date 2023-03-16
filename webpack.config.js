const path = require('path');

module.exports = {
  target: 'node',
  entry: './src/api/providers/nodejs/nodejs.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
            configFile: 'nodetsconfig.json'
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.join(__dirname, 'nodejs-assets', 'nodejs-project'),
    filename: 'main.js',
  },
  optimization: {
    minimize: false,
  },
  externals: {
    'rn-bridge': 'commonjs rn-bridge'
  },
};