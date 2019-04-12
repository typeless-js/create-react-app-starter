import { createForm } from 'typeless-form';
import { LoginFormSymbol } from './symbol';

interface LoginForm {
  username: string;
  password: string;
}

export const [
  useLoginForm,
  LoginFormActions,
  getLoginFormState,
  LoginFormProvider,
] = createForm<LoginForm>({
  symbol: LoginFormSymbol,
  validator: (errors, values) => {
    if (!values.username) {
      errors.username = 'Please enter username!';
    }
    if (!values.password) {
      errors.password = 'Please enter password!';
    }
  },
});
