import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, within } from 'storybook/test';

import { AutocompleteInput } from '../autocomplete-input';

const meta = {
  title: 'Molecules/AutocompleteInput',
  component: AutocompleteInput,
  args: {
    placeholder: '********',
    searchValue: 'Test',
    items: [
      {
        id: 1,
        title: 'Test item',
      },
    ],
    name: 'test',
    label: 'Test Label',
    emptyMessage: '',
    onSearchValueChange: fn(),
    onSelectedValueChange: fn(),
  },
  render: args => <AutocompleteInput {...args} />,
} satisfies Meta<typeof AutocompleteInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const autocompleteInput = canvas.getByLabelText(args.label ?? '');
    await step('Autocomplete input should be in the document', async () => {
      expect(autocompleteInput).toBeInTheDocument();
    });

    await step('Autocomplete input should have value', async () => {
      expect(autocompleteInput).toHaveValue(args.searchValue ?? '');
    });

    await step('Autocomplete input should have placeholder when search value is empty', async () => {
      expect(autocompleteInput).toHaveAttribute('placeholder', args.placeholder ?? '');
    });
  },
} satisfies Story;
