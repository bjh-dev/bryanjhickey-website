import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import prettierPlugin from 'eslint-plugin-prettier'

const config = [
  ...nextCoreWebVitals,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          trailingComma: 'all',
          semi: false,
          tabWidth: 2,
          singleQuote: true,
          printWidth: 80,
          endOfLine: 'auto',
          arrowParens: 'always',
          plugins: ['prettier-plugin-tailwindcss'],
        },
        {
          usePrettierrc: false,
        },
      ],
    },
  },
  {
    ignores: ['**/sanity.types.ts', '.sanity/**', 'coverage/**', 'dist/**'],
  },
]

export default config
