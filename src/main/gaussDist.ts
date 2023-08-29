import { mapRange } from './mapRange';
import { cdfInv } from './cdfInv';

/**
 * Distributes `n` numbers normally from `min` to `max`.
 *
 * @param n The number of numbers to distribute.
 * @param a The minimum value.
 * @param b The maximum value.
 */
export function gaussDist(n: number, a: number, b: number): number[] {
  const arr = [];
  const q = n + 1;

  const gMin = cdfInv(1 / q);
  const gMax = cdfInv(n / q);

  const v = mapRange(gMin, gMax, a, b);

  for (let i = 1; i < q; i++) {
    arr.push(v(cdfInv(i / q)));
  }
  return arr;
}
