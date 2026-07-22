const js = require("@eslint/js");
const tseslint = require("@typescript-eslint/eslint-plugin");
const tsparser = require("@typescript-eslint/parser");
const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const reactNative = require("eslint-plugin-react-native");
const globals = require("globals");

module.exports = [
	js.configs.recommended,
	{
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			parser: tsparser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				...globals.node,
				...globals.es2021,
				__DEV__: "readonly",
				requestAnimationFrame: "readonly",
			},
		},
		plugins: {
			"@typescript-eslint": tseslint,
			react: react,
			"react-hooks": reactHooks,
			"react-native": reactNative,
		},
		rules: {
			...tseslint.configs.recommended.rules,
			...react.configs.recommended.rules,
			...react.configs["jsx-runtime"].rules,
			...reactHooks.configs.recommended.rules,
			"react/react-in-jsx-scope": "off",
			"react/prop-types": "off",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
				},
			],
			"no-unused-vars": "off",
		},
		settings: {
			react: {
				version: "detect",
			},
		},
	},
	{
		files: ["**/*.js"],
		languageOptions: {
			globals: {
				...globals.node,
				...globals.es2021,
			},
		},
	},
	{
		ignores: [
			"node_modules/**",
			".expo/**",
			"dist/**",
			"build/**",
			"*.config.js",
			"android/**",
			"ios/**",
			".git/**",
		],
	},
];
