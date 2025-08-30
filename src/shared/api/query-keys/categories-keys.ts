export const categoriesKeys = {
  all: ['categories'],
  lists: () => [...categoriesKeys.all, 'list'],
  list: () => [...categoriesKeys.lists()],
};
