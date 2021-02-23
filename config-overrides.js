const { override, fixBabelImports, addLessLoader } = require('customize-cra')
const theme = require('./package.json').theme
module.exports = override(
	fixBabelImports('import', {
		libraryName: 'antd-mobile',
		libraryDirectory: 'es',
		style: true
	}),
	addLessLoader({
		lessOptions: {
			javascriptEnabled: true,
			modifyVars: theme
		}
	})
)
