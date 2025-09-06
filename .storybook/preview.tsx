import type { Preview } from '@storybook/nextjs-vite';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';

import '@/app/globals.css';

import { I18nProviderClient } from '../src/locales/client';
import React from 'react';
import { AuthProvider } from '../src/features/auth/providers/auth-providers';

const preview: Preview = {
  decorators: [
    (Story, { parameters }) => {
      return (
        <I18nProviderClient locale="en" fallback="en">
          <AuthProvider>
            <Story />
          </AuthProvider>
        </I18nProviderClient>
      );
    },
  ],
  parameters: {
    nextjs: {
      appDirectory: true,
      router: {
        locale: 'en',
        locales: ['en', 'pl'],
        defaultLocale: 'en',
      },
    },
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  initialGlobals: {
    locale: 'en',
  },
};

export default preview;
