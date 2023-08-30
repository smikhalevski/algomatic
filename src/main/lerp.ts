import { Mapper } from './types';
import { binarySearch } from './binarySearch';
import { min } from './utils';
import { nan } from './nan';

/**
 * Returns a linear interpolation function for given pivot points.
 *
 * **Notes:** Don't mutate `xs` and `ys` arrays after creating this function since data from these arrays is read during
 * interpolation.
 *
 * ```ts
 * const fn = lerp(xs, ys);
 * const y = fn(x);
 * ```
 *
 * @param xs The array of X coordinates of pivot points in ascending order.
 * @param ys The array of corresponding Y coordinates of pivot points.
 * @returns The function that takes X coordinate and returns an interpolated Y coordinate.
 * @group Interpolation
 */
export function lerp(xs: ArrayLike<number>, ys: ArrayLike<number>): Mapper<number> {
  const n = min(xs.length, ys.length);
  const x0 = xs[0];
  const y0 = ys[0];
  const xn = xs[n - 1];
  const yn = ys[n - 1];

  if (n === 0) {
    return nan;
  }

  return x => {
    let i, xj, yj;

    if (x <= x0) {
      return y0;
    }
    if (x >= xn) {
      return yn;
    }

    i = binarySearch(xs, x, n);
    if (i >= 0) {
      return ys[i];
    }
    i = ~i;

    xj = xs[i - 1];
    yj = ys[i - 1];

    return yj + ((x - xj) / (xs[i] - xj)) * (ys[i] - yj);
  };
}
