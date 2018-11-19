module.exports = {
	transform: {
		'^.+\\.(js|jsx)$': 'babel-jest',
		'^.+\\.(css|scss)$': '<rootDir>/client/test/mockStyle.js'
	},
	collectCoverageFrom: [
		'client/js/components/**/*.test.js',
		'server/**/*.test.js'
		],
	setupTestFrameworkScriptFile: '<rootDir>/client/test/enzyme.js',
	moduleNameMapper: {
		'^scss(.*)$': '<rootDir>/client/scss$1',
		'^global/components(.*)$': '<rootDir>/client/js/global/components$1',
		'^global/redux(.*)$': '<rootDir>/client/js/global/redux$1'
	}
};