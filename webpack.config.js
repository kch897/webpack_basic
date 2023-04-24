const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const { Template } = require('webpack');

module.exports = {
	mode:"development", // production (최종), none, development
	// entry: './src/index.js', // 모든 스크립트를 작성할 곳, 입구
	entry: {
		// index: './src/index.js'
		index: path.join(__dirname,'src','index.js')
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: './js/[name].js', // js/index.js
	},
	devServer: {
		static:'./dist'
	},
	plugins: [
		new CleanWebpackPlugin(), // 웹팩실행(build) 할 때마다 dist 청소
		new HtmlWebpackPlugin({
			template: './src/index.html', // 번들전 html
			filename:'./index.html', // 번들후 html
			hash: true, // 모든 스크립트, css 캐시 무효화
			showErrors: true, // 오류 html에 출력
			chunks: ["index"]

		}),
		new MiniCssExtractPlugin({
			// You don't need this for `>= 5.52.0` due to the fact that this is enabled by default
			// Required only for `>= 5.33.2 & <= 5.52.0`
			// Not available/unsafe for `<= 5.33.2`
			filename:'./css/style.css', // 번들후 html
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/i, // 확장자가 css로 끝나는 파일 선택
				// use: ["style-loader", "css-loader"], // 로딩 순서는 오른쪽부터
				use: [MiniCssExtractPlugin.loader, "css-loader"],
				exclude: /node_modules/
				
			},
		],
	}
};