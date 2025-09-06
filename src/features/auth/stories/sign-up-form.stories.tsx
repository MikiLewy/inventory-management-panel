import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { within, expect, userEvent } from 'storybook/test';

import SignUpForm from '../components/organisms/sign-up-form/sign-up-form';

const meta = {
  title: 'Features/Auth/SignUpForm',
  component: SignUpForm,
  render: () => (
    <div className="mt-10 max-w-md mx-auto">
      <SignUpForm />
    </div>
  ),
} satisfies Meta<typeof SignUpForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  play: async ({ step, canvasElement }) => {
    const canvas = within(canvasElement);
    const emailInput = canvas.getByLabelText('Email');
    const passwordInput = canvas.getByLabelText('Password');
    const passwordConfirmationInput = canvas.getByLabelText('Confirm password');

    await step('Email input should be in the document', async () => {
      expect(emailInput).toBeInTheDocument();
    });

    await step('it should throw validation error when email is not valid', async () => {
      await userEvent.type(emailInput, 'invalid');
      await userEvent.click(canvas.getByRole('button', { name: /Sign up/i }));
      const errorMessage = canvas.getByText(/Enter a valid email address/i);
      expect(errorMessage).toBeInTheDocument();
    });

    await step('Password input should be in the document', async () => {
      expect(passwordInput).toBeInTheDocument();
    });

    await step('Password confirmation input should be in the document', async () => {
      expect(passwordInput).toBeInTheDocument();
    });

    await step('it should throw validation error when password filed is not valid', async () => {
      await userEvent.type(passwordInput, 'invalid');
      await userEvent.click(canvas.getByRole('button', { name: /Sign up/i }));
      const errorMessage = canvas.getByText(/Password must be at least 8 characters/i);
      expect(errorMessage).toBeInTheDocument();
    });

    await step('it should throw validation error when password confirmation filed is not valid', async () => {
      await userEvent.type(passwordConfirmationInput, 'invalid');

      await userEvent.click(canvas.getByRole('button', { name: /Sign up/i }));

      const errorMessage = canvas.getByText(/This field is required/i);
      expect(errorMessage).toBeInTheDocument();
    });

    await step('it should render login link', async () => {
      const loginLink = canvas.getByRole('link', { name: /Login/i });

      expect(loginLink).toBeInTheDocument();
    });
  },
} satisfies Story;

export const Mobile = {
  globals: {
    viewport: { value: 'iphone13', isRotated: false },
  },
} satisfies Story;
