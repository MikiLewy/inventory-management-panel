export const debounce = <T extends (...args: unknown[]) => unknown>(func: T, timeout = 1000) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>): void => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};
