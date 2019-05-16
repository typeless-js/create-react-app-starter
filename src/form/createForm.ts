import * as Rx from 'src/rx';
import {
  ConvertActions,
  createActions,
  createReducer,
  DefaultState,
  Epic,
  Reducer,
  useModule,
} from 'typeless';
import { ChainedReducer } from 'typeless/ChainedReducer';
import { createFormProvider } from './createFormProvider';

type Validator<T, TState> = (
  errors: { [x in keyof T]?: string },
  data: T,
  state: TState
) => { [x in keyof T]?: string } | void;

export interface FormState<T> {
  values: T;
  errors: { [x in keyof T]?: string };
  touched: { [x in keyof T]?: boolean };
}

type GetValues<TState> = TState extends FormState<infer T> ? T : never;

type GetSub<TState, TPath> = TPath extends keyof TState
  ? GetValues<TState[TPath]>
  : never;

type GetSub2<TState, TPathA, TPathB> = TPathA extends keyof TState
  ? GetSub<TState[TPathA], TPathB>
  : never;

export interface FormOptions<TState, TPathA extends keyof TState> {
  name: string;
  reducerPath: [TPathA];
  validator?: Validator<GetSub<TState, TPathA>, TState>;
}

export interface FormOptions2<
  TState,
  TPathA extends keyof TState,
  TPathB extends keyof TState[TPathA]
> {
  name: string;
  reducerPath: [TPathA, TPathB];
  validator?: Validator<GetSub2<TState, TPathA, TPathB>, TState>;
}

export interface FormResult<TData, TState> {
  actions: ConvertActions<{
    blur: (
      field: keyof TData
    ) => { payload: { field: keyof TData }; meta: { form: string } };
    focus: (
      field: keyof TData
    ) => { payload: { field: keyof TData }; meta: { form: string } };
    change: (
      field: keyof TData,
      // eslint-disable-next-line no-undef
      value: TData[typeof field]
    ) => {
      // eslint-disable-next-line no-undef
      payload: { field: keyof TData; value: TData[typeof field] };
      meta: { form: string };
    };
    changeMany: (
      values: Partial<TData>
    ) => {
      payload: { values: Partial<TData> };
      meta: { form: string };
    };
    replace: (
      values: TData
    ) => {
      payload: { values: TData };
      meta: { form: string };
    };
    setErrors: (
      errors: { [x in keyof TData]?: string }
    ) => {
      payload: { errors: { [x in keyof TData]?: string } };
    };
    touchAll: null;
    submit: null;
    setSubmitSucceeded: null;
    setSubmitFailed: null;
    reset: null;
    resetTouched: null;
    validate: null;
  }>;
  useForm: () => void;
  reducer: ChainedReducer<FormState<TData>> & Reducer<FormState<TData>>;
  epic: Epic<TState>;
  FormProvider: (props: { children: React.ReactChild }) => JSX.Element;
}

export function createForm<
  TPathA extends keyof TState,
  TState = DefaultState,
  TData = GetSub<TState, TPathA>
>(options: FormOptions<TState, TPathA>): FormResult<TData, TState>;
export function createForm<
  TPathA extends keyof TState,
  TPathB extends keyof TState[TPathA],
  TState = DefaultState,
  TData = GetSub2<TState, TPathA, TPathB>
>(options: FormOptions2<TState, TPathA, TPathB>): FormResult<TData, TState>;
export function createForm<
  TPathA extends keyof TState,
  TPathB extends keyof TState[TPathA],
  TState = DefaultState,
  TData = GetSub2<TState, TPathA, TPathB>
>(options: FormOptions<TState, TPathA> | FormOptions2<TState, TPathA, TPathB>) {
  const { name, validator, reducerPath } = options;
  const form = name;
  const actions = createActions(`form_${form}`, {
    blur: (field: keyof TData) => ({ payload: { field }, meta: { form } }),
    focus: (field: keyof TData) => ({ payload: { field }, meta: { form } }),
    change: (field: keyof TData, value: TData[typeof field]) => ({
      payload: { field, value },
      meta: { form },
    }),
    changeMany: (values: Partial<TData>) => ({
      payload: { values },
      meta: { form },
    }),
    replace: (values: TData) => ({
      payload: { values },
      meta: { form },
    }),
    setErrors: (errors: { [x in keyof TData]?: string }) => ({
      payload: { errors },
    }),
    touchAll: null,
    submit: null,
    setSubmitSucceeded: null,
    setSubmitFailed: null,
    reset: null,
    resetTouched: null,
    validate: null,
  });
  const initialState: FormState<TData> = {
    values: {} as TData,
    errors: {},
    touched: {},
  };
  const selector = (state: any) =>
    (reducerPath as string[]).reduce((ret, path) => ret[path], state);
  const epic = new Epic<TState>(`form_${form}`)
    .onMany(
      [
        actions.change,
        actions.blur,
        actions.changeMany,
        actions.replace,
        actions.validate,
      ],
      (_, { getState }) => {
        if (!validator) {
          return Rx.empty();
        }
        const state = selector(getState());
        const errors = {} as any;
        const ret = validator!(errors, state.values, getState()) as any;
        return actions.setErrors(ret || errors);
      }
    )
    .on(actions.submit, (_, { getState, action$ }) => {
      return Rx.concatObs(
        Rx.of(actions.validate()),
        action$.pipe(
          Rx.waitForType(actions.setErrors),
          Rx.map(() => {
            const state = selector(getState());
            const anyError = Object.values(state.errors).some(x => !!x);
            return anyError
              ? actions.setSubmitFailed()
              : actions.setSubmitSucceeded();
          })
        ),
        Rx.of(actions.touchAll())
      );
    });
  const reducer = createReducer(initialState)
    .on(actions.blur, (state, { field }) => {
      state.touched[field] = true;
    })
    .on(actions.change, (state, { field, value }) => {
      state.values[field] = value;
    })
    .on(actions.changeMany, (state, { values }) => {
      Object.assign({}, state.values, values);
    })
    .on(actions.replace, (state, { values }) => {
      state.values = values;
    })
    .on(actions.setErrors, (state, { errors }) => {
      state.errors = errors;
    })
    .on(actions.touchAll, state => {
      state.touched = Object.keys(state.errors).reduce(
        (ret, key) => {
          ret[key] = true;
          return ret;
        },
        {} as any
      );
    })
    .on(actions.resetTouched, state => {
      state.touched = {};
    })
    .on(actions.reset, () => {
      return initialState;
    });
  const useForm = () => {
    useModule({
      epic,
      reducer: reducer as any,
      reducerPath: reducerPath as any,
      actions,
    });
  };
  const FormProvider = createFormProvider(selector, actions);
  return { actions, useForm, reducer, epic, FormProvider };
}
