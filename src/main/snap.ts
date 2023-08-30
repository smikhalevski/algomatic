import { Mapper } from './types';
import { abs } from './utils';
import { sign } from './sign';

/**
 * Rounds `x` to the closest value that is divided by `n` without any remainder.
 *
 * ```ts
 * snap(10)(17);
 * // ⮕ 20
 *
 * snap(3)(-10);
 * // ⮕ -9
 * ```
 *
 * @group Math
 */
export function snap(n: number): Mapper<number> {
  return x => {
    const d = x % n;
    return abs(d) < n / 2 ? x - d : x - d + n * sign(x);
  };
}
