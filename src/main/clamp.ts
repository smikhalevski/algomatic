import { Mapper } from './types';

/**
 * Clamps `x` to range [`a`, `b`].
 *
 * ```ts
 * clamp()(0.2);
 * // ⮕ 0.2
 *
 * clamp()(-2);
 * // ⮕ 0.5
 *
 * clamp(5, 10)(33);
 * // ⮕ 10
 * ```
 *
 * @group Math
 */
export function clamp(a = 0, b = 1): Mapper<number> {
  return x => (x < a ? a : x > b ? b : x);
}
