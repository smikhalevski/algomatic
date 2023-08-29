import { Mapper } from './types';

export function all(...fns: Mapper[]): Mapper {
  return x => {
    for (const fn of fns) {
      x = fn(x);
    }
    return x;
  };
}
