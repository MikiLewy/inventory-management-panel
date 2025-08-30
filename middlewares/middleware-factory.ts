import { CustomMiddleware } from './custom-middleware';

export type MiddlewareFactory = (
  middleware: CustomMiddleware,
) => CustomMiddleware;
