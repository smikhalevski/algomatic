import { Mapper } from './types';

/**
 * Composes mapper functions into a single function.
 *
 * @param fs The composed mapper functions.
 * @group Utils
 */
export function compose<T>(...fs: Mapper<T>[]): Mapper<T> {
  return x => {
    for (const f of fs) {
      x = f(x);
    }
    return x;
  };
}
