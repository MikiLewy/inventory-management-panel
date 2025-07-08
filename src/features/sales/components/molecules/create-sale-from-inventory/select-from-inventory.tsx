import { OnChangeFn, RowSelectionState } from '@tanstack/react-table';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { StepContent } from '@/components/atoms/stepper/step-content';
import { StepNavigatorButtons } from '@/components/molecules/step-navigator-buttons';
import { DataTable } from '@/components/organisms/data-table/data-table';
import { useProducts } from '@/features/inventory/hooks/query/use-products';
import { useInventoryProductsTableColumns } from '@/features/sales/hooks/use-inventory-products-table-columns';
import { CreateSaleEvent } from '@/features/sales/utils/create-sale-machine';
import { usePagination } from '@/hooks/use-pagination';
import { useI18n } from '@/locales/client';
import { SizeUnit } from '@/types/enum/size-unit';

import { CreateSaleFromInventoryFormValues } from '../../organisms/create-sale-from-inventory-sheet/create-sale-from-inventory-sheet';

interface Props {
  send: (event: CreateSaleEvent) => void;
  selectedRows: Record<number, boolean>;
  setSelectedRows: OnChangeFn<RowSelectionState>;
}

const SelectFromInventory = ({ send, selectedRows, setSelectedRows }: Props) => {
  const t = useI18n();

  const { setValue } = useFormContext<CreateSaleFromInventoryFormValues>();

  const { pageIndex, limit, offset, onPaginationChange } = usePagination(0, 5);

  const [query, setQuery] = useState('');

  const handleChangeQuery = (query: string) => {
    setQuery(query);
    onPaginationChange({ pageIndex: 0, pageSize: limit });
  };

  const { data: productsData, isLoading } = useProducts({ limit, offset, query });

  const columns = useInventoryProductsTableColumns();

  const nextButtonDisabled = Object.entries(selectedRows).length <= 0;

  const { data: allProductsData } = useProducts({
    limit: productsData?.total || 5,
    offset: 0,
    enabled: !!productsData?.total && productsData.total > 0,
  });

  const onNext = () => {
    const selectedProducts = allProductsData?.resources.filter(product => selectedRows[product.id]);

    const transformedProducts = selectedProducts?.map(product => ({
      id: product.id,
      name: product.name,
      size: product.size,
      sizeUnit: product.sizeUnit as SizeUnit,
      soldPrice: 0,
      soldPlace: '',
      soldDate: new Date(),
    }));

    setValue('products', transformedProducts || []);

    send({ type: 'NEXT' });
  };

  return (
    <StepContent>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">{t('createSale.selectFromInventory')}</h2>

          <DataTable
            columns={columns}
            data={productsData?.resources ?? []}
            isLoading={isLoading}
            search={{ query, handleChangeQuery }}
            pagination={{
              pageIndex,
              pageSize: limit,
              totalItems: productsData?.total ?? 0,
              onPaginationChange,
            }}
            selectable={{
              rowSelection: selectedRows,
              setRowSelection: setSelectedRows,
            }}
          />
        </div>
      </div>

      <StepNavigatorButtons onNext={onNext} nextDisabled={nextButtonDisabled} />
    </StepContent>
  );
};

export default SelectFromInventory;
