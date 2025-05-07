import { useEffect, useMemo, useRef } from 'react';

import { debounce } from '@/utils/debounce';

export const useDebounce = (callback: () => void, timeout: number = 1000) => {
  const ref = useRef<() => void>(null);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, timeout);
  }, [timeout]);

  return debouncedCallback;
};
