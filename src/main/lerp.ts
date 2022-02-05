import {binarySearch} from './binary-search';

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
export function lerp(xs: ArrayLike<number>, ys: ArrayLike<number>): (x: number) => number {
  const n = Math.min(xs.length, ys.length);

  if (n === 0) {
    return () => NaN;
  }
  if (n === 1) {
    const y0 = ys[0];
    return () => y0;
  }
  return (x) => {
    let i = binarySearch(xs, x, n);
    if (i >= 0) {
      return ys[i];
    }
    i = ~i;
    const yj = ys[i - 1];
    return yj + x * (ys[i] - yj);
  };
}
