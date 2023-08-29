import { Mapper } from './types';

export function mapRange(a1: number, b1: number, a2 = 0, b2 = 1): Mapper {
  return x => a2 + ((b2 - a2) * (x - a1)) / (b1 - a1);
}
