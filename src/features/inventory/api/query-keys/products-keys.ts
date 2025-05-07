export const productsKeys = {
  all: ['products'],
  lists: () => [...productsKeys.all, 'list'],
  list: ({ page, perPage }: { page: number; perPage: number }) => [...productsKeys.lists(), { page, perPage }],
};
