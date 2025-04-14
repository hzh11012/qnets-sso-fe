import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config(
    { ignores: ['dist'] },
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tseslint.parser,
            ecmaVersion: 2020,
            globals: globals.browser
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            react: reactPlugin,
            prettier: prettierPlugin,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh
        },
        extends: [
            prettier,
            js.configs.recommended,
            ...tseslint.configs.recommended
        ],
        rules: {
            ...prettierPlugin.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true }
            ]
        }
    }
);
