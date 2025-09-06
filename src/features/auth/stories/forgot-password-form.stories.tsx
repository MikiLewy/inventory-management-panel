import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import ForgotPasswordForm from '../components/organisms/forgot-password-form/forgot-password-form';

const meta = {
  title: 'Features/Auth/ForgotPasswordForm',
  component: ForgotPasswordForm,
  render: () => (
    <div className="mt-10 max-w-md mx-auto">
      <ForgotPasswordForm />
    </div>
  ),
} satisfies Meta<typeof ForgotPasswordForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  play: async ({ step, canvasElement }) => {
    await step('Email input should be in the document', async () => {
      const canvas = within(canvasElement);
      const emailInput = canvas.getByPlaceholderText(/m@example.com/i);

      expect(emailInput).toBeInTheDocument();
    });

    await step('it should throw validation error when email is not valid', async () => {
      const canvas = within(canvasElement);
      const emailInput = canvas.getByPlaceholderText(/m@example.com/i);
      await userEvent.type(emailInput, 'invalid');
      await userEvent.click(canvas.getByRole('button', { name: /reset/i }));
      const errorMessage = canvas.getByText(/Enter a valid email address/i);
      expect(errorMessage).toBeInTheDocument();
    });

    await step('it should render login link', async () => {
      const canvas = within(canvasElement);

      const loginLink = canvas.getByRole('link', { name: /login/i });

      expect(loginLink).toBeInTheDocument();
    });
  },
} satisfies Story;

export const Mobile = {
  globals: {
    viewport: { value: 'iphone13', isRotated: false },
  },
} satisfies Story;
