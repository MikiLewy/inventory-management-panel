import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { PasswordInput } from '../password-input';

const meta = {
  title: 'Atoms/PasswordInput',
  component: PasswordInput,
  args: { placeholder: '********', value: 'test password', onChange: fn() },
  render: args => <PasswordInput {...args} />,
} satisfies Meta<typeof PasswordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const passwordInput = canvas.getByPlaceholderText(args.placeholder ?? '');

    await step('Password input should be in the document', async () => {
      expect(passwordInput).toBeInTheDocument();
    });

    await step('Password input should have value', async () => {
      expect(passwordInput).toHaveValue(args.value as string);
    });

    await step('Password input should have type password', async () => {
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    await step('Password should not be visible', async () => {
      expect(passwordInput).not.toHaveAttribute('type', 'text');
    });

    await step('Password should be visible when clicked', async () => {
      const visibilityButton = canvas.getByRole('button');
      await userEvent.click(visibilityButton);
      expect(passwordInput).toHaveAttribute('type', 'text');
    });

    await step('Password should not be visible when clicked again', async () => {
      const visibilityButton = canvas.getByRole('button');
      await userEvent.click(visibilityButton);

      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  },
} satisfies Story;
