export const productsKeys = {
  all: ['products'],
  lists: () => [...productsKeys.all, 'list'],
  list: ({ page, perPage, query }: { page: number; perPage: number; query: string }) => [
    ...productsKeys.lists(),
    { page, perPage, query },
  ],
};
