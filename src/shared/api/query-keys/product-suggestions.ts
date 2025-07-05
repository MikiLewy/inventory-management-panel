export const productSuggestionsQueryKeys = {
  all: ['product-suggestions'],
  lists: () => [...productSuggestionsQueryKeys.all, 'list'],
  list: (search: string) => [...productSuggestionsQueryKeys.lists(), { search }],
};
