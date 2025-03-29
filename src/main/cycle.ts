import { Mapper } from './types';
import { ceil } from './utils';

/**
 * Brings value to the range [{@link a}, {@link b}] by adding or subtracting the range size |{@link a} - {@link b}|.
 *
 * @example
 * cycle(0, 10)(12);
 * // ⮕ 2
 *
 * cycle(100, 33)(-333);
 * // ⮕ 69
 *
 * @param a Minimum range value.
 * @param b Maximum range value.
 * @group Algebra
 */
export function cycle(a = 0, b = 1): Mapper<number> {
  const d = b - a;
  return x => (x > a ? x - ceil((x - b) / d) * d : x + ceil((a - x) / d) * d);
}
