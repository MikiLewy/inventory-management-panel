import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { within, expect, userEvent } from 'storybook/test';

import LoginForm from '../components/organisms/login-form/login-form';

const meta = {
  title: 'Features/Auth/LoginForm',
  component: LoginForm,
  render: () => (
    <div className="mt-10 max-w-md mx-auto">
      <LoginForm />
    </div>
  ),
} satisfies Meta<typeof LoginForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  play: async ({ step, canvasElement }) => {
    const canvas = within(canvasElement);
    const emailInput = canvas.getByLabelText(/email/i);
    const passwordInput = canvas.getByLabelText(/password/i);

    await step('Email input should be in the document', async () => {
      expect(emailInput).toBeInTheDocument();
    });

    await step('it should throw validation error when email is not valid', async () => {
      await userEvent.type(emailInput, 'invalid');
      await userEvent.click(canvas.getByRole('button', { name: /Login/i }));
      const errorMessage = canvas.getByText(/Enter a valid email address/i);
      expect(errorMessage).toBeInTheDocument();
    });

    await step('Password input should be in the document', async () => {
      expect(passwordInput).toBeInTheDocument();
    });

    await step('it should render sign up link', async () => {
      const signUpLink = canvas.getByRole('link', { name: /Sign up/i });

      expect(signUpLink).toBeInTheDocument();
    });
  },
} satisfies Story;

export const Mobile = {
  globals: {
    viewport: { value: 'iphone13', isRotated: false },
  },
} satisfies Story;
