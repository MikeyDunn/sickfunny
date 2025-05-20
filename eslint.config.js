import eslintPluginPrettier from 'eslint-plugin-prettier'
import prettier from 'eslint-config-prettier'

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          semi: false,
          singleQuote: true,
          printWidth: 100,
          tabWidth: 2,
          trailingComma: 'es5',
          bracketSpacing: true,
          arrowParens: 'avoid',
          endOfLine: 'lf',
        },
      ],
    },
  },
  prettier,
]
