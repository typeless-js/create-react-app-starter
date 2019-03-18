import * as Rx from 'src/rx';

export const login = (username: string, password: string) =>
  Rx.of(null).pipe(
    Rx.delay(300),
    Rx.mergeMap(() => {
      if (username === 'user' && password === 'pass') {
        return Rx.of({ user: { id: 'a', username: 'user' }, token: '123' });
      }
      throw new Error('Invalid username or password');
    }),
  );
