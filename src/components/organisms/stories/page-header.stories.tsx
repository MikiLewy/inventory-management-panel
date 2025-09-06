import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { Button } from '@/components/ui/button';

import PageHeader from '../page/page-header';

const meta = {
  title: 'Organisms/PageHeader',
  component: PageHeader,
  args: { title: 'Test Title', description: 'Test Description' },
  render: args => <PageHeader {...args} />,
} satisfies Meta<typeof PageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const pageHeader = canvas.getByText(args.title ?? '');
    await step('Page header should be in the document', async () => {
      expect(pageHeader).toBeInTheDocument();
    });

    await step('Page header should have description', async () => {
      expect(pageHeader).toBeInTheDocument();
    });
  },
} satisfies Story;

export const WithoutDescription = {
  args: {
    description: undefined,
  },
} satisfies Story;

export const WithActions = {
  args: {
    children: <Button>Test Button</Button>,
  },
  play: async ({ canvasElement, step }) => {
    await step('Page header should have actions', async () => {
      const canvas = within(canvasElement);
      const pageHeader = canvas.getByRole('button', { name: /Test Button/i });
      expect(pageHeader).toBeInTheDocument();
    });
  },
} satisfies Story;
