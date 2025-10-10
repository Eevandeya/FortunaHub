import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
    {
        ignores: [
            'package-lock.json',
            'vite.config.*',
            '*.config.js',
            '*.config.ts',
            'dist',
            'build',
            '.coverage/',
            '.env',
            '.env.local',
            '.env.example',
        ],
    },
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: { jsx: true },
                sourceType: 'module',
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            prettier: eslintPluginPrettier,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            camelcase: [
                'error',
                {
                    properties: 'always',
                    ignoreDestructuring: true,
                    ignoreImports: true,
                },
            ],
            'prettier/prettier': 'error',
            'no-console': ['error', { allow: ['warn', 'error'] }],
            'no-debugger': 'error',
            'no-inline-comments': 'error',
            'no-warning-comments': [
                'error',
                { terms: ['todo', 'fixme'], location: 'anywhere' },
            ],
        },
    },
];
