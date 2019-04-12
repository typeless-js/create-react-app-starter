import React, { useContext } from 'react';
import { FormContext } from 'typeless-form';
import { FormInput, FormInputProps } from './FormInput';

interface ReduxFormControlProps extends FormInputProps {
  name: string;
}

export const ReduxInput = (props: ReduxFormControlProps) => {
  const { name, ...rest } = props;
  const data = useContext(FormContext);
  if (!data) {
    throw new Error(`${name} cannot be used without FormContext`);
  }
  const hasError = data.touched[name] && !!data.errors[name];
  const value = data.values[name];
  return (
    <FormInput
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
