import { Mapper } from './types';

export function decay(fn: Mapper): Mapper {
  return x => 1 - fn(x);
}
