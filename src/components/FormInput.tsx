import React from 'react';
import styled, { css } from 'styled-components';

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label: string;
  error?: string | null;
}

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  line-height: 1.5;
  color: #495057;
  font-size: 16px;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 4px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
    outline-offset: -2px;
  }
`;

const Error = styled.div`
  width: 100%;
  margin-top: 4px;
  font-size: 80%;
  color: #dc3545;
`;

const _FormInput = (props: FormInputProps) => {
  const { className, label, error, ...rest } = props;
  return (
    <div className={className}>
      <Label>{label}</Label>
      <Input {...rest} />
      {error && <Error>{error}</Error>}
    </div>
  );
};

export const FormInput = styled(_FormInput)`
  width: 100%;
  display: block;
  ${props =>
    props.error &&
    css`
      ${Input} {
        border-color: #dc3545;
        &:focus {
          box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.25);
        }
      }
    `}
`;
