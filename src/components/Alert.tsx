import React from 'react';
import styled from 'styled-components';

interface AlertProps {
  className?: string;
  children: React.ReactNode;
}

const _Alert = (props: AlertProps) => {
  const { className, children } = props;
  return <div className={className}>{children}</div>;
};

export const Alert = styled(_Alert)`
  position: relative;
  padding: 12px 20px;
  margin-bottom: 16px;
  border: 1px solid transparent;
  border-radius: 4px;

  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
`;
