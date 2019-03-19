import * as React from 'react';
import { GlobalActions } from 'src/features/global/interface';
import styled from 'styled-components';
import { useActions } from 'typeless';
import { Button } from './Button';

const Header = styled.div`
  display: flex;
  padding: 1rem 1.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
`;

const AppName = styled.h1`
  font-weight: 400;
  margin: 0;
  margin-right: auto;
  font-size: 1.25rem;
`;

const Main = styled.main`
  padding: 20px;
`;

interface DashboardProps {
  className?: string;
  children: React.ReactNode;
}

export const Dashboard = (props: DashboardProps) => {
  const { children } = props;
  const { logout } = useActions(GlobalActions);
  return (
    <>
      <Header>
        <AppName>Starter</AppName>
        <Button onClick={logout}>logout</Button>
      </Header>
      <Main>{children}</Main>
    </>
  );
};
