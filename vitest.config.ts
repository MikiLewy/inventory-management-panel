import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, defineProject } from 'vitest/config';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    projects: [
      defineProject({
        esbuild: {
          jsx: 'automatic',
        },
        test: {
          name: 'unit',
          include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
          exclude: ['node_modules', '.storybook'],
          environment: 'jsdom',
          globals: true,
          setupFiles: ['./vitest.setup.ts'],
        },
        resolve: {
          alias: {
            '@': path.resolve(dirname, './src'),
            '@components': path.resolve(dirname, './src/components'),
            '@features': path.resolve(dirname, './src/features'),
            '@hooks': path.resolve(dirname, './src/hooks'),
            '@lib': path.resolve(dirname, './src/lib'),
            '@server': path.resolve(dirname, './src/server'),
            '@types': path.resolve(dirname, './src/types'),
            '@constants': path.resolve(dirname, './src/constants'),
            '@utils': path.resolve(dirname, './src/utils'),
            '@assets': path.resolve(dirname, './public/assets'),
          },
        },
      }),
      // Storybook tests project
      defineProject({
        plugins: [
          storybookTest({
            // The location of your Storybook config, main.js|ts
            configDir: path.join(dirname, '.storybook'),
            // This should match your package.json script to run Storybook
            // The --ci flag will skip prompts and not open a browser
            storybookScript: 'yarn storybook --ci',
          }),
        ],
        test: {
          name: 'storybook',
          // Enable browser mode
          browser: {
            enabled: true,
            // Make sure to install Playwright
            provider: 'playwright',
            headless: true,
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['./.storybook/vitest.setup.ts'],
        },
      }),
    ],
  },
});
