import React from 'react';
import styled, { css } from 'styled-components';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label: string;
  error?: string | null;
}

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const StyledInput = styled.input`
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

const _Input = (props: InputProps) => {
  const { className, label, error, ...rest } = props;
  return (
    <div className={className}>
      <Label>{label}</Label>
      <StyledInput {...rest} />
      {error && <Error>{error}</Error>}
    </div>
  );
};

export const Input = styled(_Input)`
  width: 100%;
  display: block;
  ${props =>
    props.error &&
    css`
      ${StyledInput} {
        border-color: #dc3545;
        &:focus {
          box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.25);
        }
      }
    `};
`;
