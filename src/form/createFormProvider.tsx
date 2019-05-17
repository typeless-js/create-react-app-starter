import React, { useMemo } from 'react';
import { useActions, useMappedState } from 'typeless';
import { FormContext } from './FormContext';

export function createFormProvider<
  S,
  A extends {
    blur: (...args: any[]) => any;
    change: (...args: any[]) => any;
  }
>(mapState: (state: S) => any, actions: A) {
  return (props: { children: React.ReactChild }) => {
    const { blur, change } = useActions(actions);
    const form = useMappedState(mapState);
    const { children } = props;
    const value = useMemo(
      () =>
        Object.assign({}, form, {
          actions: { blur, change },
        }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [form]
    );

    return (
      <FormContext.Provider value={value}>{children}</FormContext.Provider>
    );
  };
}
