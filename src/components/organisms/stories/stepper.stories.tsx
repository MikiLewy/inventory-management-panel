import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { I18nProviderClient } from '@/locales/client';

import Stepper from '../stepper';

const meta = {
  title: 'Organisms/Stepper',
  component: Stepper,
  args: {
    steps: [
      {
        key: 'product-details',
        step: '1',
      },
      {
        key: 'size-and-price',
        step: '2',
      },
    ],
    context: { step: '1', content: 'Test Content' },
  },
  render: args => (
    <I18nProviderClient locale="en">
      <Stepper {...args} />
    </I18nProviderClient>
  ),
} satisfies Meta<typeof Stepper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  play: async ({ canvasElement, step }) => {
    await step('Stepper should be in the document', async () => {
      const canvas = within(canvasElement);
      const activeIndicator = canvas.getByTestId('active-indicator');
      const step = canvas.getByText('2');

      expect(activeIndicator).toBeInTheDocument();
      expect(step).toBeInTheDocument();
    });
  },
} satisfies Story;

export const Complete = {
  args: {
    context: { step: '2', content: 'Test Content' },
  },
  play: async ({ canvasElement, step }) => {
    await step('First step should be complete', async () => {
      const canvas = within(canvasElement);
      const completeIndicator = canvas.getByTestId('complete-indicator');

      expect(completeIndicator).toBeInTheDocument();
    });

    await step('Second step should be active', async () => {
      const canvas = within(canvasElement);
      const activeIndicator = canvas.getByTestId('active-indicator');

      expect(activeIndicator).toBeInTheDocument();
    });
  },
} satisfies Story;

export const BothStepsCompleted = {
  args: {
    context: { step: '3', content: 'Test Content' },
  },
} satisfies Story;
