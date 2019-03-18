import { createForm } from 'src/form';

export const {
  actions: LoginFormActions,
  useForm: useLoginForm,
  FormProvider: LoginFormProvider,
} = createForm({
  name: 'login',
  reducerPath: ['loginForm'],
  validator: (errors, values) => {
    if (!values.username) {
      errors.username = 'Please enter username!';
    }
    if (!values.password) {
      errors.password = 'Please enter password!';
    }
  },
});
