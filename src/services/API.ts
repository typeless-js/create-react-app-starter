import * as Rx from 'src/rx';

const sampleUser = { id: 'a', username: 'user' };

export const login = (username: string, password: string) =>
  Rx.of({ user: sampleUser, token: '123' }).pipe(
    Rx.delay(300),
    Rx.map(user => {
      if (username === 'user' && password === 'pass') {
        return user;
      }
      throw new Error('Invalid username or password');
    })
  );

export const getUser = () => Rx.of(sampleUser).pipe(Rx.delay(300));
