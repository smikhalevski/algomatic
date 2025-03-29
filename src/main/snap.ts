import { Mapper } from './types';
import { abs } from './utils';
import { sign } from './sign';

/**
 * Rounds `x` to the closest value that is divided by {@link divisor} without any remainder.
 *
 * @example
 * snap(10)(17);
 * // ⮕ 20
 *
 * snap(3)(-10);
 * // ⮕ -9
 *
 * @param divisor The divisor.
 * @group Algebra
 */
export function snap(divisor: number): Mapper<number> {
  return x => {
    const d = x % divisor;
    return abs(d) < divisor / 2 ? x - d : x - d + divisor * sign(x);
  };
}
