import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { within, expect, userEvent } from 'storybook/test';

import SetUpPasswordForm from '../components/organisms/set-up-password-form/set-up-password-form';

const meta = {
  title: 'Features/Auth/SetUpPasswordForm',
  component: SetUpPasswordForm,
  render: () => (
    <div className="mt-10 max-w-md mx-auto">
      <SetUpPasswordForm />
    </div>
  ),
} satisfies Meta<typeof SetUpPasswordForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  play: async ({ step, canvasElement }) => {
    const canvas = within(canvasElement);
    const passwordInput = canvas.getByLabelText('Password');
    const passwordConfirmationInput = canvas.getByLabelText('Confirm password');

    await step('Password input should be in the document', async () => {
      expect(passwordInput).toBeInTheDocument();
    });

    await step('Password confirmation input should be in the document', async () => {
      expect(passwordConfirmationInput).toBeInTheDocument();
    });

    await step('it should throw validation error when password filed is not valid', async () => {
      await userEvent.type(passwordInput, 'invalid');
      await userEvent.click(canvas.getByRole('button', { name: /Set up/i }));
      const errorMessage = canvas.getByText(/Password must be at least 8 characters/i);
      expect(errorMessage).toBeInTheDocument();
    });

    await step('it should throw validation error when password confirmation filed is not valid', async () => {
      await userEvent.type(passwordConfirmationInput, ' ');

      await userEvent.click(canvas.getByRole('button', { name: /Set up/i }));

      const errorMessage = canvas.getByText(/This field is required/i);
      expect(errorMessage).toBeInTheDocument();
    });

    await step('it should render return to login link', async () => {
      const loginLink = canvas.getByRole('link', { name: /Return to login/i });

      expect(loginLink).toBeInTheDocument();
    });
  },
} satisfies Story;

export const Mobile = {
  globals: {
    viewport: { value: 'iphone13', isRotated: false },
  },
} satisfies Story;
