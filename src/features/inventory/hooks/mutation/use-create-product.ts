import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { createProduct } from '../../api/lib/products';
import { productsKeys } from '../../api/query-keys/products-keys';

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productsKeys.lists() });

      toast.success('Product created successfully');
    },
    onError: () => {
      toast.error('Failed to create product');
    },
  });
};
