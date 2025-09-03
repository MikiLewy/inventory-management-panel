import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { I18nProviderClient } from '@/locales/client';

import { PasswordInput } from '../password-input';

const meta = {
  title: 'Atoms/PasswordInput',
  component: PasswordInput,
  args: { placeholder: '********', value: 'test password', onChange: fn() },
  render: args => (
    <I18nProviderClient locale="en">
      <PasswordInput {...args} />
    </I18nProviderClient>
  ),
} satisfies Meta<typeof PasswordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  play: async ({ canvasElement, step, args }) => {
    await step('Password input should be in the document', async () => {
      const canvas = within(canvasElement);
      const passwordInput = canvas.getByPlaceholderText(args.placeholder ?? '');

      expect(passwordInput).toBeInTheDocument();
    });

    await step('Password input should have value', async () => {
      const canvas = within(canvasElement);
      const passwordInput = canvas.getByPlaceholderText(args.placeholder ?? '');

      expect(passwordInput).toHaveValue(args.value as string);
    });

    await step('Password input should have type password', async () => {
      const canvas = within(canvasElement);
      const passwordInput = canvas.getByPlaceholderText(args.placeholder ?? '');

      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    await step('Password should not be visible', async () => {
      const canvas = within(canvasElement);
      const passwordInput = canvas.getByPlaceholderText(args.placeholder ?? '');

      expect(passwordInput).not.toHaveAttribute('type', 'text');
    });

    await step('Password should be visible when clicked', async () => {
      const canvas = within(canvasElement);
      const passwordInput = canvas.getByPlaceholderText(args.placeholder ?? '');

      const visibilityButton = canvas.getByRole('button');
      await userEvent.click(visibilityButton);
      expect(passwordInput).toHaveAttribute('type', 'text');
    });

    await step('Password should not be visible when clicked again', async () => {
      const canvas = within(canvasElement);
      const passwordInput = canvas.getByPlaceholderText(args.placeholder ?? '');

      const visibilityButton = canvas.getByRole('button');
      await userEvent.click(visibilityButton);

      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  },
} satisfies Story;
