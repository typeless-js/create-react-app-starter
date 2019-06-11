import React, { useContext } from 'react';
import { FormContext } from 'typeless-form';
import { Input, InputProps } from './FormInput';

interface ReduxFormControlProps extends InputProps {
  name: string;
}

export const FormInput = (props: ReduxFormControlProps) => {
  const { name, ...rest } = props;
  const data = useContext(FormContext);
  if (!data) {
    throw new Error(`${name} cannot be used without FormContext`);
  }
  const hasError = data.touched[name] && !!data.errors[name];
  const value = data.values[name];
  return (
    <Input
      value={value == null ? '' : value}
      error={hasError ? data.errors[name] : null}
      onBlur={() => data.actions.blur(name)}
      onChange={e => {
        data.actions.change(name, e.target.value);
      }}
      {...rest}
    />
  );
};
