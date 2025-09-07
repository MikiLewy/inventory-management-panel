export const warehousesKeys = {
  all: ['warehouses'],
  lists: () => [...warehousesKeys.all, 'list'],
  list: () => [...warehousesKeys.lists()],
  details: () => [...warehousesKeys.lists(), 'detail'],
  detail: (id: number) => [...warehousesKeys.details(), { id }],
  hasProducts: (id: number) => [...warehousesKeys.details(), { id }, 'has-products'],
};
