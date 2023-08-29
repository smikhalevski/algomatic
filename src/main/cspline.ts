import { Interpolator, MutableArrayLike } from './types';
import { binarySearch } from './binarySearch';
import { min } from './utils';

/**
 * Returns a natural cubic spline interpolation function for given pivot points.
 *
 * **Notes:** Don't mutate `xs` and `ys` arrays after creating this function since data from these arrays is read during
 * interpolation.
 *
 * ```ts
 * const f = cspline(xs, ys);
 * const y = f(x);
 * ```
 *
 * @param xs The array of X coordinates of pivot points in ascending order.
 * @param ys The array of corresponding Y coordinates of pivot points.
 * @returns The function that takes X coordinate and returns an interpolated Y coordinate.
 * @group Interpolation
 */
export function cspline(xs: ArrayLike<number>, ys: ArrayLike<number>): Interpolator {
  let n = 0;

  const splines: number[] = [];

  const fn: Interpolator = x => (n === 0 ? NaN : n === 1 ? ys[0] : interpolateCSpline(xs, ys, x, n, splines));

  fn.update = (nextXs, nextYs) => {
    const nextN = min(nextXs.length, nextYs.length);
    xs = nextXs;
    ys = nextYs;

    if (nextN > 1) {
      for (let i = n * 3; i < nextN * 3; ++i) {
        splines.push(0);
      }
      populateCSplines(xs, ys, nextN, splines);
    }
    n = nextN;
  };

  fn.update(xs, ys);

  return fn;
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
 */
export function interpolateCSpline(
  xs: ArrayLike<number>,
  ys: ArrayLike<number>,
  x: number,
  n: number,
  splines: MutableArrayLike<number>
): number {
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

  const k = i * 3;
  const dx = x - xs[i];

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
