import { MutableRefObject, useEffect, useRef } from 'react';

export function usePrevious<T>(value: T) {
  const ref = useRef<T>(null) as MutableRefObject<T>;

  useEffect(() => {
    ref.current = value;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return ref.current;
}
