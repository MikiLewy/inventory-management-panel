'use client';

import { ReactNode, useState, useEffect } from 'react';

import { Skeleton } from '../ui/skeleton';

interface Props {
  children: ReactNode;
}

const ClientOnly = ({ children }: Props) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted)
    return (
      <div className="flex flex-col gap-3">
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
      </div>
    );

  return children;
};

export default ClientOnly;
