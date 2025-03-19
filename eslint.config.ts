import tsPlugin from '@typescript-eslint/eslint-plugin'
import prettierPlugin from 'eslint-plugin-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

module.exports = [
  {
    ignores: ['node_modules/'],
  },
  {
    files: ['**/*.js', '**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...prettierPlugin.configs?.rules,
      'import/order': 'off',
      '@typescript-eslint/no-explicit-any': ['off'],
      '@typescript-eslint/member-ordering': 0,
      '@typescript-eslint/naming-convention': 0,
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
    },
  },
  eslintPluginPrettierRecommended,
]
