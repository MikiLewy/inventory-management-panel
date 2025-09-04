import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { Button } from '@/components/ui/button';

import Dialog from '../dialog';

const meta = {
  title: 'Organisms/Dialog',
  component: Dialog,
  args: {
    open: true,
    onClose: fn(),
    onSubmit: fn(),
    title: 'Test Title',
    description: 'Test Description',
    children: <div>Test Children</div>,
  },
  render: args => <Dialog {...args} />,
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement.parentElement!);

    await step('Dialog should be in the document', async () => {
      await waitFor(() => {
        const dialog = canvas.getByText(args.title ?? '');
        expect(dialog).toBeInTheDocument();
      });
    });

    await step('Dialog should have description', async () => {
      const dialog = canvas.getByText(args.description ?? '');

      expect(dialog).toBeInTheDocument();
    });

    await step('Dialog should have children', async () => {
      const dialog = canvas.getByText(/Test Children/i);
      expect(dialog).toBeInTheDocument();
    });

    await step('Dialog should have close button', async () => {
      const dialog = canvas.getByRole('button', { name: /Close/i });
      expect(dialog).toBeInTheDocument();
    });

    await step('Dialog should have confirm button', async () => {
      const dialog = canvas.getByRole('button', { name: /confirm/i });
      expect(dialog).toBeInTheDocument();
    });

    await step('Should call onClose when close button is clicked', async () => {
      const dialog = canvas.getByRole('button', { name: /Close/i });
      await userEvent.click(dialog);
      expect(args.onClose).toHaveBeenCalled();
    });

    await step('Should call onSubmit when confirm button is clicked', async () => {
      const canvas = within(canvasElement.parentElement!);
      const dialog = canvas.getByRole('button', { name: /confirm/i });
      await userEvent.click(dialog);
      expect(args.onSubmit).toHaveBeenCalled();
    });
  },
} satisfies Story;

export const WithLoadingButton = {
  args: {
    isSubmitButtonLoading: true,
  },
  play: async ({ canvasElement, step }) => {
    await step('Dialog should have loading button', async () => {
      const canvas = within(canvasElement.parentElement!);
      const dialog = canvas.getByRole('button', { name: /Loading/i });
      expect(dialog).toBeInTheDocument();
    });
  },
} satisfies Story;

export const WithDisabledButton = {
  args: {
    isSubmitButtonDisabled: true,
  },
  play: async ({ canvasElement, step }) => {
    await step('Dialog should have disabled button', async () => {
      const canvas = within(canvasElement.parentElement!);
      const dialog = canvas.getByRole('button', { name: /confirm/i });
      expect(dialog).toBeDisabled();
    });
  },
} satisfies Story;

export const WithoutCancelAction = {
  args: {
    onClose: undefined,
  },
  play: async ({ canvasElement, step }) => {
    await step('Dialog should not have cancel button', async () => {
      const canvas = within(canvasElement.parentElement!);
      const dialog = canvas.queryByRole('button', { name: /cancel/i });
      expect(dialog).not.toBeInTheDocument();
    });
  },
} satisfies Story;

export const WithoutSubmitAction = {
  args: {
    onSubmit: undefined,
  },
  play: async ({ canvasElement, step }) => {
    await step('Dialog should not have submit button', async () => {
      const canvas = within(canvasElement.parentElement!);
      const dialog = canvas.queryByRole('button', { name: /confirm/i });
      expect(dialog).not.toBeInTheDocument();
    });
  },
} satisfies Story;

export const WithAdditionalActions = {
  args: {
    actionsSlot: <Button variant="outline">Test Button</Button>,
  },
  play: async ({ canvasElement, step }) => {
    await step('Dialog should have additional actions', async () => {
      const canvas = within(canvasElement.parentElement!);
      const dialog = canvas.getByRole('button', { name: /Test Button/i });
      expect(dialog).toBeInTheDocument();
    });
  },
} satisfies Story;
