import { createForm } from 'typeless-form';
import { LoginFormSymbol } from './symbol';

export interface LoginFormValues {
  username: string;
  password: string;
}

export const [
  useLoginForm,
  LoginFormActions,
  getLoginFormState,
  LoginFormProvider,
] = createForm<LoginFormValues>({
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
