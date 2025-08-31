'use client';

import { RowSelectionState } from '@tanstack/react-table';
import { Tag, Trash } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

import ActionsTableMenu, { Action } from '@/components/atoms/actions-table-menu';
import BulkActionsBubble from '@/components/atoms/bulk-actions-bubble';
import { DataTable } from '@/components/organisms/data-table/data-table';
import { ProductStatus } from '@/features/inventory/api/types/enum/product-status';
import { useDuplicateProduct } from '@/features/inventory/hooks/mutation/use-duplicate-product';
import { useProducts } from '@/features/inventory/hooks/query/use-products';
import {
  InventoryActionSlotPayload,
  useInventoryTableColumns,
} from '@/features/inventory/hooks/use-inventory-table-columns';
import { useDialog } from '@/hooks/use-dialog';
import { useSelection } from '@/hooks/use-selection';
import { useUrlFilters } from '@/hooks/use-url-filters';
import { useUrlPagination } from '@/hooks/use-url-pagination';
import { useUrlQuery } from '@/hooks/use-url-query';
import { useUrlSort } from '@/hooks/use-url-sort';
import { useI18n } from '@/locales/client';

import MarkProductsAsSoldDialog from '../../organisms/dialogs/mark-products-as-sold/mark-products-as-sold';
import RemoveProductDialog from '../../organisms/dialogs/remove-product-dialog';
import { EditProductSheet } from '../../organisms/edit-product-sheet/edit-product-sheet';

const ClientInventory = () => {
  const t = useI18n();

  const { query, handleChangeQuery } = useUrlQuery();

  const { offset, limit, pageIndex, onPaginationChange } = useUrlPagination();

  const { sortBy, sortDirection, onSortChange } = useUrlSort('updated_at', 'desc');

  const { filters } = useUrlFilters();

  const { data: productsData, isLoading } = useProducts({ offset, limit, query, sortBy, sortDirection, filters });

  const [selectedProduct, setSelectedProduct] = useState<InventoryActionSlotPayload | null>(null);

  const [isOpenRemoveProductDialog, handleOpenRemoveProductDialog, handleCloseRemoveProductDialog] = useDialog();

  const [isOpenEditProductSheet, handleOpenEditProductSheet, handleCloseEditProductSheet] = useDialog();

  const { selectedRows, setSelectedRows, handleClearSelected } = useSelection();

  const onQueryChange = useCallback(
    (query: string) => {
      handleChangeQuery(query);
      onPaginationChange({ pageIndex: 0, pageSize: limit });
    },
    [handleChangeQuery],
  );

  const { mutate: duplicateProduct } = useDuplicateProduct();

  const actionsSlot = useCallback((payload: InventoryActionSlotPayload) => {
    const actions: Action[] = [
      {
        key: 'edit',
        label: t('common.button.edit'),
        onClick: () => {
          handleOpenEditProductSheet();
          setSelectedProduct(payload);
        },
      },
      {
        key: 'duplicate',
        label: t('inventory.dialog.duplicateProduct.title'),
        onClick: () => {
          duplicateProduct(payload.id);
        },
      },
      {
        key: 'mark-as-sold',
        label: t('inventory.markAsSold'),
        onClick: () => {
          handleOpenMarkAsSoldDialog();
          setSelectedProduct(payload);
        },
      },
      {
        key: 'remove',
        label: t('common.button.remove'),
        onClick: () => {
          handleOpenRemoveProductDialog();
          setSelectedProduct(payload);
        },
      },
    ];

    return <ActionsTableMenu actions={actions} />;
  }, []);

  const [isOpenMarkAsSoldDialog, handleOpenMarkAsSoldDialog, handleCloseMarkAsSoldDialog] = useDialog();

  const onCancelMarkAsSoldDialog = () => {
    handleCloseMarkAsSoldDialog();
    handleClearSelected();
  };

  const onCancelRemoveProductDialog = () => {
    handleCloseRemoveProductDialog();
    handleClearSelected();
  };

  const facetedFilters = [
    {
      id: 'status',
      title: t('inventory.table.status'),
      options: [
        {
          label: t('inventory.productStatus.inStock'),
          value: ProductStatus.IN_STOCK,
        },
        {
          label: t('inventory.productStatus.inDelivery'),
          value: ProductStatus.IN_DELIVERY,
        },
      ],
    },
  ];

  const columns = useInventoryTableColumns(actionsSlot);

  const isAllItemsFromCurrentPageSelected = useMemo(() => {
    return productsData?.resources.every(product => selectedRows[product.id?.toString()]) ?? false;
  }, [selectedRows, productsData]);

  return (
    <div>
      <DataTable
        columns={columns}
        view="inventory"
        data={productsData?.resources ?? []}
        isLoading={isLoading}
        search={{ query, handleChangeQuery: onQueryChange }}
        facetedFilters={facetedFilters}
        pagination={{
          pageIndex,
          pageSize: limit,
          totalItems: productsData?.total ?? 0,
          onPaginationChange,
        }}
        sortable={{
          sortBy,
          sortDirection,
          onSortChange,
        }}
        selectable={{
          rowSelection: selectedRows,
          setRowSelection: setSelectedRows,
        }}
      />
      <BulkActionsBubble
        isOpen={Object.keys(selectedRows).length > 0}
        onClose={handleClearSelected}
        onSelectAll={() =>
          setSelectedRows(prev => ({
            ...prev,
            ...(productsData?.resources.reduce((acc, product) => {
              acc[product.id?.toString()] = true;
              return acc;
            }, {} as RowSelectionState) || {}),
          }))
        }
        isAllItemsSelected={isAllItemsFromCurrentPageSelected}
        allItemsCount={productsData?.resources.length ?? 0}
        actions={[
          {
            key: 'mark-as-sold',
            icon: <Tag />,
            label: t('inventory.markAsSold'),
            onClick: handleOpenMarkAsSoldDialog,
          },
          {
            key: 'remove',
            icon: <Trash />,
            destructive: true,
            label: t('common.button.remove'),
            onClick: handleOpenRemoveProductDialog,
          },
        ]}
        selectedItemsCount={Object.keys(selectedRows).length}
      />
      <RemoveProductDialog
        open={isOpenRemoveProductDialog}
        onClose={onCancelRemoveProductDialog}
        selectedProductIds={selectedProduct ? [selectedProduct.id] : Object.keys(selectedRows).map(key => Number(key))}
        selectedProductName={selectedProduct?.name}
      />
      <EditProductSheet
        open={isOpenEditProductSheet}
        onClose={handleCloseEditProductSheet}
        selectedProductId={selectedProduct?.id || 0}
      />
      <MarkProductsAsSoldDialog
        open={isOpenMarkAsSoldDialog}
        onClose={onCancelMarkAsSoldDialog}
        selectedProductsIds={selectedProduct ? [selectedProduct.id] : Object.keys(selectedRows).map(key => Number(key))}
      />
    </div>
  );
};

export default ClientInventory;
