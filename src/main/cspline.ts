import { Mapper, MutableArrayLike } from './types';
import { binarySearch } from './binarySearch';
import { min } from './utils';
import { nan } from './nan';

/**
 * Returns a natural cubic spline interpolation function for given pivot points.
 *
 * **Notes:** Don't mutate `xs` and `ys` arrays after creating this function since data from these arrays is read during
 * interpolation.
 *
 * ```ts
 * const fn = cspline(xs, ys);
 * const y = fn(x);
 * ```
 *
 * @param xs The array of X coordinates of pivot points in ascending order.
 * @param ys The array of corresponding Y coordinates of pivot points.
 * @returns The function that takes X coordinate and returns an interpolated Y coordinate.
 * @group Interpolation
 */
export function cspline(xs: ArrayLike<number>, ys: ArrayLike<number>): Mapper<number> {
  const n = min(xs.length, ys.length);

  if (n === 0) {
    return nan;
  }
  if (n === 1) {
    const y0 = ys[0];
    return () => y0;
  }

  const splines = new Float32Array(n * 3);

  populateCSplines(xs, ys, n, splines);

  return x => interpolateCSpline(xs, ys, x, n, splines);
}

/**
 * Interpolates `y` at `x` using a natural cubic spline algorithm for a set of pivot points.
 *
 * ```ts
 * const splines = new Float32Array(xs.length * 3);
 * populateCSplines(xs, ys, xs.length, splines);
 *
 * const y = interpolateCSpline(xs, ys, x, xs.length, splines);
 * ```
 *
 * @param xs The array of X coordinates of pivot points in ascending order, length must be at least 2.
 * @param ys The array of corresponding Y coordinates of pivot points.
 * @param x The X coordinate of interpolated point.
 * @param n The number of pivot points, usually equals `xs.length`.
 * @param splines The array of spline components, length must be `n * 3`.
 * @returns Interpolated Y coordinate.
 *
 * @see {@link createCSplines}
 * @see {@link https://en.wikipedia.org/wiki/Spline_(mathematics)#Algorithm_for_computing_natural_cubic_splines Algorithm for computing natural cubic splines}
 * @group Interpolation
 * @internal
 */
export function interpolateCSpline(
  xs: ArrayLike<number>,
  ys: ArrayLike<number>,
  x: number,
  n: number,
  splines: MutableArrayLike<number>
): number {
  let i, k, dx;

  if (x <= xs[0]) {
    return ys[0];
  }
  if (x >= xs[n - 1]) {
    return ys[n - 1];
  }

  i = binarySearch(xs, x, n);
  if (i >= 0) {
    return ys[i];
  }
  i = ~i;

  k = i * 3;
  dx = x - xs[i];

  return ys[i] + (splines[k + 2] + (splines[k] / 2 + (splines[k + 1] * dx) / 6) * dx) * dx;
}

/**
 * Computes cubic splines for given pivot points.
 *
 * ```ts
 * const splines = new Float32Array(xs.length * 3);
 * populateCSplines(xs, ys, xs.length, splines);
 * ```
 *
 * @param xs The array of X coordinates of pivot points in ascending order, length must be at least 2.
 * @param ys The array of corresponding Y coordinates of pivot points.
 * @param n The number of pivot points, usually equals `xs.length`.
 * @param splines Mutable array that would be populated with spline components, length must be at least `n * 3`.
 * @group Interpolation
 * @internal
 */
export function populateCSplines(
  xs: ArrayLike<number>,
  ys: ArrayLike<number>,
  n: number,
  splines: MutableArrayLike<number>
): void {
  let k, a, b, c;

  splines[0] = splines[1] = splines[2] = splines[n * 3 - 3] = 0;

  for (let i = 1; i < n - 1; ++i) {
    k = i * 3;
    a = xs[i] - xs[i - 1];
    b = xs[i + 1] - ys[i];
    c = a * splines[k - 1] + 2 * (a + b);

    // Temporary store to avoid excessive allocations
    splines[k + 1] = -b / c;
    splines[k + 2] = (6 * ((ys[i + 1] - ys[i]) / b - (ys[i] - ys[i - 1]) / a) - a * splines[k - 1]) / c;
  }

  for (let k = n * 3 - 6; k > 0; k -= 3) {
    splines[k] = splines[k + 1] * splines[k + 3] + splines[k + 2];
  }

  for (let i = n - 1; i > 0; --i) {
    k = i * 3;
    a = splines[k - 3];
    b = splines[k];
    c = xs[i] - xs[i - 1];

    splines[k + 1] = (b - a) / c;
    splines[k + 2] = (c * (2 * b + a)) / 6 + (ys[i] - ys[i - 1]) / c;
  }
}
