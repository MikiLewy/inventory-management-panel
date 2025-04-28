import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  prefetchDataFunctions: ((queryClient: QueryClient) => Promise<void>)[];
}

const HydrationBoundaryProvider = async ({ children, prefetchDataFunctions }: Props) => {
  const queryClient = new QueryClient();

  await Promise.allSettled(prefetchDataFunctions.map(prefetchDataFunction => prefetchDataFunction(queryClient)));

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
};

export default HydrationBoundaryProvider;
