import { defineConfig } from 'eslint/config';
import next from 'eslint-config-next';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import { globalIgnores } from 'eslint/config';

export default defineConfig([
  next,
  ...tseslint.configs.recommended,

  prettier,

  globalIgnores(['.next/**', 'out/**', 'build/**', 'node_modules/**']),
]);
