import { Mapper } from './types';
import { ceil } from './utils';

/**
 * Brings `x` to the range [`a`, `b`] by adding or subtracting the range size |`a` - `b`|.
 *
 * ```ts
 * cycle(0, 10)(12);
 * // ⮕ 2
 *
 * cycle(100, 33)(-333);
 * // ⮕ 69
 * ```
 *
 * @group Math
 */
export function cycle(a = 0, b = 1): Mapper<number> {
  const d = b - a;
  return x => (x > a ? x - ceil((x - b) / d) * d : x + ceil((a - x) / d) * d);
}
