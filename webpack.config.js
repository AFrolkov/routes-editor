const webpack = require('webpack');

module.exports = {
	entry: {
		app: "./js/app"
	},
	output: {
		path: __dirname + '/build',
		filename: 'bundle.js'
	},
	watch: true,
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel',
			exclude: /\/node_modules\//,
			query: {
        		presets: ['es2015']
      		}
		}, {
			test: /\.jade$/,
			loader: 'jade',
		}, {
        	test: /\.scss$/,
        	loader: "style!css!sass"
      	}, {
        	test: /\.css$/,
        	loader: "style!css"
    	}, {
        	test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
        	loader: "file?name=[path][name].ext"
    	}]
	},

	plugins: []
}

module.exports.plugins.push(
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false,
			drop_console: true
		}
	})
);