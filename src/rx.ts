import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export * from 'typeless/rx';

export const catchLog = <T, R>(
  fn: (err: Error, source: Observable<T>) => Observable<R>
) =>
  catchError<T, R>((err, source) => {
    if (process.env.NODE_ENV !== 'test') {
      // tslint:disable-next-line:no-console
      console.error(err);
    }
    return fn(err, source);
  });
