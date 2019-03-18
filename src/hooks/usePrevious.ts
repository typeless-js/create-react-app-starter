import { MutableRefObject, useEffect, useRef } from 'react';

export function usePrevious<T>(value: T) {
  const ref = useRef<T>(null) as MutableRefObject<T>;

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
