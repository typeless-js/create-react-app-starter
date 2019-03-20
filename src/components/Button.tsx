import React from 'react';
import styled, { css } from 'styled-components';
import { Spinner } from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  block?: boolean;
  large?: boolean;
  loading?: boolean;
}

const _Button = (props: ButtonProps) => {
  const { children, large, block, loading, disabled, ...rest } = props;
  return (
    <button {...rest} disabled={disabled || loading}>
      {loading && <Spinner />}
      {children}
    </button>
  );
};

export const Button = styled(_Button)`
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 6px 12px;
  font-size: 16px;
  line-height: 1.5;
  border-radius: 4px;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  color: #fff;
  background-color: #007bff;
  border-color: #007bff;

  &&&:disabled {
    background-color: #007bff;
    border-color: #007bff;
    opacity: 0.65;
  }

  &:not(:disabled) {
    cursor: pointer;
  }
  &:hover {
    background-color: #0069d9;
    border-color: #0062cc;
  }
  &:active {
    background-color: #0062cc;
    border-color: #005cbf;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
  }

  ${props =>
    props.block &&
    css`
      width: 100%;
      display: block;
    `};

  ${props =>
    props.large &&
    css`
      padding: 8px 16px;
      font-size: 20px;
      line-height: 1.5;
      border-radius: 5px;
    `};

  ${Spinner} {
    margin-right: 10px;
  }
`;
