import { assign, createMachine } from 'xstate';

export enum CreateProductStepperTitle {
  PRODUCT_DETAILS = 'createProduct.steps.productDetails.title',
  SIZE_AND_PRICE = 'createProduct.steps.sizeAndPrice.title',
}

export interface Step {
  step: string;
  title: CreateProductStepperTitle;
}

export interface CreateProductContext {
  step: string;
  content: CreateProductStepperTitle;
}

export enum CreateProductStates {
  PRODUCT_DETAILS = 'product-details',
  SIZE_AND_PRICE = 'size-and-price',
}

export type CreateProductEvent =
  | {
      type: 'NEXT';
    }
  | {
      type: 'BACK';
    }
  | {
      type: 'RESET';
    };

export const createProductMachine = createMachine({
  types: {} as {
    context: CreateProductContext;
    states: {
      [CreateProductStates.PRODUCT_DETAILS]: unknown;
      [CreateProductStates.SIZE_AND_PRICE]: unknown;
    };
    events: CreateProductEvent;
  },
  id: 'create-product',
  context: ({ input }: { input: CreateProductContext }) => ({
    step: input?.step ?? '1',

    content: CreateProductStepperTitle.PRODUCT_DETAILS,
  }),
  initial: CreateProductStates.PRODUCT_DETAILS,
  states: {
    [CreateProductStates.PRODUCT_DETAILS]: {
      on: {
        NEXT: {
          target: CreateProductStates.SIZE_AND_PRICE,
          actions: assign({
            step: '2',
            content: CreateProductStepperTitle.SIZE_AND_PRICE,
          }),
        },
      },
    },
    [CreateProductStates.SIZE_AND_PRICE]: {
      on: {
        BACK: {
          target: CreateProductStates.PRODUCT_DETAILS,
          actions: assign({
            step: '1',
            content: CreateProductStepperTitle.PRODUCT_DETAILS,
          }),
        },
        RESET: {
          target: CreateProductStates.PRODUCT_DETAILS,
          actions: assign({
            step: '1',
            content: CreateProductStepperTitle.PRODUCT_DETAILS,
          }),
        },
      },
    },
  },
});
