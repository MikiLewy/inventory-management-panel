import api from '@/api/clients/api';

export const fetchProducts = async (page: number, perPage: number) => {
  const { data } = await api.get('/products', {
    params: {
      page,
      perPage,
    },
  });

  return data;
};
