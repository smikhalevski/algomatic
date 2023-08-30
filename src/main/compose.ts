import { Mapper } from './types';

/**
 * Composes mapper functions into a single function.
 *
 * @param fns The composed mapper functions.
 * @group Utils
 */
export function compose<T>(...fns: Mapper<T>[]): Mapper<T> {
  return x => {
    for (const fn of fns) {
      x = fn(x);
    }
    return x;
  };
}
