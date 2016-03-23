var path = require('path');
var webpack = require('webpack');

module.exports = function(options) {
  var output = {
    path: options.dir,
    pathinfo: true,
    filename: '[name].js',
    publicPath: '/'
  };

  if (options.sourcemaps) {
    output.sourceMapFilename = '[name].map';
  }

  var entry = {
    main: './app.js',
    base: [
      'jquery',
      'moment'
    ]
  };

  var modulesDirectories = [
    '../bower_components'
  ];

  var bowerPath = '../bower_components';
  var nodePath = '../../node_modules';

  var aliases = {
    'moment': path.resolve(__dirname, bowerPath + '/moment/moment.js'),
    'jquery': path.resolve(__dirname, bowerPath + '/jquery/dist/jquery.js')
  };

  var loaders = [
    {
      test: /\.js$/,
      exclude: [
        /[\\\/]node_modules/,
        /[\\\/]bower_components/
      ],
      loader: 'ng-annotate!babel'
    }, {
      test: /\.es6$/,
      loader: 'babel'
    }, {
      test: /[\\\/]bower_components[\\\/]angular[\\\/]angular\.js$/,
      loader: "imports?$=jquery"
    }, {
      test: /[\\\/]bower_components[\\\/]angular[\\\/]angular-sanitize\.js$/,
      loader: "imports?$=angular-sanitize"
    }, {
      test: /[\\\/]bower_components[\\\/]jquery[\\\/]dist[\\\/]jquery\.js$/,
      loader: 'expose?jQuery!expose?$'
    }, {
      test: /\.html$/, 
      loader: 'html-loader'
    }, {
      test: /\.css$/,
      exclude: [
        /bootstrap[\\\/]js[\\\/]/
      ],
      loader: 'style!css'
    }, {
        test: /\.less$/,
        loader: "style!css!less"
    }, {
      test: /\.png$/,
      loader: 'url?limit=100000&mimetype=image/png&name=assets/[name].[hash].[ext]'
    }, {
      test: /\.jpg$/,
      exclude: [
        '/app\/assets/'
      ],
      loader: 'file?name=assets/[name].[hash].[ext]'
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/octet-stream"
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file"
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=image/svg+xml"
    }
  ];

  var plugins = [
    new webpack.ProvidePlugin({
      _: 'lodash',
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.optimize.OccurenceOrderPlugin(true)
  ];

  if(options.chunk) {
    plugins.push(new webpack.optimize.CommonsChunkPlugin('base', 'base.js'));
    plugins.push(new webpack.optimize.AggressiveMergingPlugin({}));
  }

  if (options.minimize) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      warnings: false,
      mangle: {
        except: ['$q']
      },
      sourceMap: false
    }));
  }

  if (options.defines) {
    plugins.push(new webpack.DefinePlugin(options.defines));
  }

  var postLoaders = [];

  return {
    entry: entry,
    context: __dirname + '/../app',
    output: output,

    devtool: options.devtool,
    debug: options.debug,

    module: {
      loaders: loaders,
      postLoaders: postLoaders,
      noParse: /\.min\.js/
    },

    resolve: {
      extensions: ['', '.js', '.json'],
      modulesDirectories: modulesDirectories,
      alias: aliases
    },

    plugins: plugins
  };
};
