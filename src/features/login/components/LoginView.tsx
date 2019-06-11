import React from 'react';
import { Alert } from 'src/components/Alert';
import { Button } from 'src/components/Button';
import { Input } from 'src/components/FormInput';
import { FormInput } from 'src/components/ReduxInput';
import styled from 'styled-components';
import { useActions } from 'typeless';
import { LoginFormActions, LoginFormProvider } from '../login-form';
import { getLoginState } from '../interface';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;

  ${Input} {
    margin-bottom: 20px;
  }
`;

const Form = styled.form`
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 16px;
  font-weight: 400;
  text-align: center;
`;

const Info = styled.div`
  text-align: center;
  margin-top: 20px;
`;

export const LoginView = () => {
  const { submit } = useActions(LoginFormActions);
  const { isLoading, error } = getLoginState.useState();

  return (
    <Wrapper>
      <LoginFormProvider>
        <Form
          onSubmit={e => {
            e.preventDefault();
            submit();
          }}
        >
          <Title>Please sign in</Title>
          {error && <Alert>{error}</Alert>}
          <FormInput name="username" label="Username" />
          <FormInput name="password" label="Password" type="password" />
          <Button large block loading={isLoading}>
            Sign in
          </Button>
          <Info>Log in as user/pass</Info>
        </Form>
      </LoginFormProvider>
    </Wrapper>
  );
};
