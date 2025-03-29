import { ArrayLike, Mapper } from './types';
import { abs } from './utils';
import { nan } from './nan';

/**
 * Returns the closest value to `x` from {@link xs}.
 *
 * If {@link xs} is empty then `x` is returned as is.
 *
 * @example
 * closest([0, 3, 6])(1.8);
 * // ⮕ 3
 *
 * @group Algebra
 */
export function closest(xs: ArrayLike<number>): Mapper<number> {
  const n = xs.length;

  if (n === 0) {
    return nan;
  }

  return x => {
    let targetX = x;
    let dx = 1 / 0;

    for (let i = 0; i < n; ++i) {
      const xi = xs[i];
      const dxi = abs(xi - x);

      if (dxi < dx) {
        targetX = xi;
        dx = dxi;
      }
    }
    return targetX;
  };
}
