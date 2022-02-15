import {Interpolator} from '../shared-types';
import {binarySearch} from '../array';

/**
 * Returns a linear interpolation function for given pivot points.
 *
 * **Notes:** Don't mutate `xs` and `ys` arrays after creating this function since data from these arrays is read during
 * interpolation.
 *
 * ```ts
 * const f = lerp(xs, ys);
 * const y = f(x);
 * ```
 *
 * @param xs The array of X coordinates of pivot points in ascending order.
 * @param ys The array of corresponding Y coordinates of pivot points.
 * @returns The function that takes X coordinate and returns an interpolated Y coordinate.
 */
export function lerp(xs: ArrayLike<number>, ys: ArrayLike<number>): Interpolator {
  let n = -1;

  const interp: Interpolator = (x) => {
    if (n === 0) {
      return NaN;
    }
    if (x <= xs[0]) {
      return ys[0];
    }
    if (x >= xs[n - 1]) {
      return ys[n - 1];
    }
    let i = binarySearch(xs, x, n);
    if (i >= 0) {
      return ys[i];
    }
    i = ~i;

    const xj = xs[i - 1];
    const yj = ys[i - 1];

    return yj + (x - xj) / (xs[i] - xj) * (ys[i] - yj);
  };

  interp.update = (nextXs, nextYs) => {
    n = Math.min(nextXs.length, nextYs.length);
    xs = nextXs;
    ys = nextYs;
  };

  interp.update(xs, ys);

  return interp;
}
