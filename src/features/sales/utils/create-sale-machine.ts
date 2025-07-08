import { assign, createMachine } from 'xstate';

export enum CreateSaleStepperTitle {
  INVENTORY_PRODUCTS = 'createSale.steps.inventoryProducts.title',
  SALE_DETAILS = 'createSale.steps.saleDetails.title',
}

export interface Step {
  step: string;
  title: CreateSaleStepperTitle;
}

export interface CreateSaleContext {
  step: string;
  content: CreateSaleStepperTitle;
}

export enum CreateSaleStates {
  INVENTORY_PRODUCTS = 'inventory-products',
  SALE_DETAILS = 'sale-details',
}

export type CreateSaleEvent =
  | {
      type: 'NEXT';
    }
  | {
      type: 'BACK';
    }
  | {
      type: 'RESET';
    };

export const createSaleMachine = createMachine({
  types: {} as {
    context: CreateSaleContext;
    states: {
      [CreateSaleStates.INVENTORY_PRODUCTS]: unknown;
      [CreateSaleStates.SALE_DETAILS]: unknown;
    };
    events: CreateSaleEvent;
  },
  id: 'create-sale',
  context: ({ input }: { input: CreateSaleContext }) => ({
    step: input?.step ?? '1',

    content: CreateSaleStepperTitle.INVENTORY_PRODUCTS,
  }),
  initial: CreateSaleStates.INVENTORY_PRODUCTS,
  states: {
    [CreateSaleStates.INVENTORY_PRODUCTS]: {
      on: {
        NEXT: {
          target: CreateSaleStates.SALE_DETAILS,
          actions: assign({
            step: '2',
            content: CreateSaleStepperTitle.SALE_DETAILS,
          }),
        },
      },
    },
    [CreateSaleStates.SALE_DETAILS]: {
      on: {
        BACK: {
          target: CreateSaleStates.INVENTORY_PRODUCTS,
          actions: assign({
            step: '1',
            content: CreateSaleStepperTitle.SALE_DETAILS,
          }),
        },
        RESET: {
          target: CreateSaleStates.INVENTORY_PRODUCTS,
          actions: assign({
            step: '1',
            content: CreateSaleStepperTitle.INVENTORY_PRODUCTS,
          }),
        },
      },
    },
  },
});
