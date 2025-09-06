import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { StepNavigatorButtons } from '../step-navigator-buttons';

const meta = {
  title: 'Molecules/StepNavigatorButtons',
  component: StepNavigatorButtons,
  args: {
    backDisabled: false,
    nextDisabled: false,
    nextIsSubmitting: false,
    onNext: fn(),
    onBack: fn(),
    onNextTitle: 'Next',
    buttonSize: 'default',
  },
  render: args => (
    <div className="w-full h-full flex justify-start">
      <StepNavigatorButtons {...args} />
    </div>
  ),
} satisfies Meta<typeof StepNavigatorButtons>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const nextButton = canvas.getByRole('button', { name: args.onNextTitle ?? 'Next' });
    const backButton = canvas.getByRole('button', { name: /Previous/i });
    await step('Step navigator buttons should be in the document', async () => {
      expect(nextButton).toBeInTheDocument();
      expect(backButton).toBeInTheDocument();
    });

    await step('Next button should be clickable', async () => {
      await userEvent.click(nextButton);

      expect(args.onNext).toHaveBeenCalled();
    });

    await step('Back button should be clickable', async () => {
      await userEvent.click(backButton);

      expect(args.onBack).toHaveBeenCalled();
    });
  },
} satisfies Story;

export const NextDisabled = {
  args: {
    nextDisabled: true,
  },
  play: async ({ canvasElement, step, args }) => {
    await step('Next button should be disabled when nextDisabled is true', async () => {
      const canvas = within(canvasElement);
      const nextButton = canvas.getByRole('button', { name: args.onNextTitle ?? 'Next' });
      expect(nextButton).toBeDisabled();
    });
  },
} satisfies Story;

export const NextIsSubmitting = {
  args: {
    nextIsSubmitting: true,
  },
  play: async ({ canvasElement, step }) => {
    await step('Next button should be loading when nextIsSubmitting is true', async () => {
      const canvas = within(canvasElement);
      const nextButton = canvas.getByRole('button', { name: /Loading/i });

      expect(nextButton).toHaveTextContent(/Loading/i);
    });
  },
} satisfies Story;
