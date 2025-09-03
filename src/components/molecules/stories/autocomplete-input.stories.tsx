import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, within } from 'storybook/test';

import { I18nProviderClient } from '@/locales/client';

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
  render: args => (
    <I18nProviderClient locale="en">
      <AutocompleteInput {...args} />
    </I18nProviderClient>
  ),
} satisfies Meta<typeof AutocompleteInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  play: async ({ canvasElement, step, args }) => {
    await step('Autocomplete input should be in the document', async () => {
      const canvas = within(canvasElement);

      const autocompleteInput = canvas.getByLabelText(args.label ?? '');

      expect(autocompleteInput).toBeInTheDocument();
    });

    await step('Autocomplete input should have value', async () => {
      const canvas = within(canvasElement);
      const autocompleteInput = canvas.getByLabelText(args.label ?? '');

      expect(autocompleteInput).toHaveValue(args.searchValue ?? '');
    });

    await step('Autocomplete input should have placeholder when search value is empty', async () => {
      const canvas = within(canvasElement);
      const autocompleteInput = canvas.getByLabelText(args.label ?? '');

      expect(autocompleteInput).toHaveAttribute('placeholder', args.placeholder ?? '');
    });
  },
} satisfies Story;
