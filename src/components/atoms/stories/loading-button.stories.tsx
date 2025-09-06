import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { LoadingButton } from '../loading-button';

const meta = {
  title: 'Atoms/LoadingButton',
  component: LoadingButton,
  args: { onClick: fn(), loading: false, children: 'Button' },
  render: args => <LoadingButton {...args}>Button</LoadingButton>,
} satisfies Meta<typeof LoadingButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    step('Button should be in the document', async () => {
      expect(button).toBeInTheDocument();
    });

    step('Button should be clickable', async () => {
      expect(button).toBeEnabled();
    });

    step('Should call onClick', async () => {
      await userEvent.click(button);

      expect(args.onClick).toHaveBeenCalled();
    });
  },
} satisfies Story;

export const LoadingState: Story = {
  args: {
    loading: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await step('Button should be in the document', async () => {
      expect(button).toBeInTheDocument();
    });

    await step('Button should have text content "Loading..."', async () => {
      expect(button).toHaveTextContent('Loading...');
    });

    await step('Button should be disabled', async () => {
      expect(button).toBeDisabled();
    });
  },
};
