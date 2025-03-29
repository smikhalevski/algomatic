import { binarySearch } from './binarySearch';
import { ArrayLike, Mapper } from './types';
import { min } from './utils';
import { nan } from './nan';

/**
 * Returns a monotonous cubic spline interpolation function for given pivot points, that prevent overshoot of
 * interpolated values.
 *
 * **Notes:** Don't mutate {@link xs} and {@link ys} arrays after creating this function since data from these arrays
 * is read during interpolation.
 *
 * @example
 * const f = csplineMonot(xs, ys);
 * const y = f(x);
 *
 * @param xs The array of X coordinates of pivot points in ascending order.
 * @param ys The array of corresponding Y coordinates of pivot points.
 * @returns The function that takes X coordinate and returns an interpolated Y coordinate.
 *
 * @see [Monotone cubic interpolation](https://en.wikipedia.org/wiki/Monotone_cubic_interpolation)
 * @group Interpolation
 */
export function csplineMonot(xs: ArrayLike<number>, ys: ArrayLike<number>): Mapper<number> {
  const n = min(xs.length, ys.length);

  if (n === 0) {
    return nan;
  }
  if (n === 1) {
    const y0 = ys[0];
    return () => y0;
  }

  const splines = new Float32Array(n * 3 - 2);

  populateCSplinesMonot(xs, ys, n, splines);

  return x => interpolateCSplineMonot(xs, ys, x, n, splines);
}

/**
 * Computes {@link y} at {@link x} for a set of pivot points ({@link xs} and {@link ys}) using monotonous cubic spline
 * interpolation that prevents overshoot of interpolated values.
 *
 * @example
 * const splines = new Float32Array(xs.length * 3 - 2);
 * populateCSplinesMonot(xs, ys, xs.length, splines);
 *
 * const y = interpolateCSplineMonot(xs, ys, x, xs.length, splines);
 *
 * @param xs The array of X coordinates of pivot points in ascending order, length must be al least 2.
 * @param ys The array of corresponding Y coordinates of pivot points.
 * @param x The X coordinate of interpolated point.
 * @param n The number of pivot points, usually equals `xs.length`.
 * @param splines The array of spline components, length must be {@link n} * 3 - 2.
 * @returns Interpolated Y coordinate.
 *
 * @see [Monotone cubic interpolation](https://en.wikipedia.org/wiki/Monotone_cubic_interpolation)
 * @group Interpolation
 * @internal
 */
export function interpolateCSplineMonot(
  xs: ArrayLike<number>,
  ys: ArrayLike<number>,
  x: number,
  n: number,
  splines: ArrayLike<number>
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
  i = ~i - 1;

  const k = i * 3;
  const dx = x - xs[i];

  return ys[i] + splines[k] * dx + splines[k + 1] * dx * dx + splines[k + 2] * dx * dx * dx;
}

/**
 * Computes monotonous splines for {@link xs} and {@link ys} that prevents overshoot of interpolated values.
 *
 * @example
 * const splines = new Float32Array(xs.length * 3 - 2);
 * populateCSplinesMonot(xs, ys, xs.length, splines);
 *
 * @param xs The array of X coordinates of pivot points in ascending order, length must be at least 2.
 * @param ys The array of corresponding Y coordinates of pivot points.
 * @param n The number of pivot points, usually equals `xs.length`.
 * @param splines Mutable array that would be populated with spline components, length must be at least
 * {@link n} * 3 - 2.
 * @returns The {@link splines} array.
 *
 * @see [Monotone cubic interpolation](https://en.wikipedia.org/wiki/Monotone_cubic_interpolation)
 * @group Interpolation
 * @internal
 */
export function populateCSplinesMonot(
  xs: ArrayLike<number>,
  ys: ArrayLike<number>,
  n: number,
  splines: ArrayLike<number>
): void {
  let k, a, b, c, d;

  const m = n - 1;

  splines[0] = (ys[1] - ys[0]) / (xs[1] - xs[0]);
  splines[m * 3] = (ys[m] - ys[m - 1]) / (xs[m] - xs[m - 1]);

  for (let i = 1; i < m; ++i) {
    a = xs[i] - xs[i - 1];
    b = xs[i + 1] - xs[i];

    c = (ys[i] - ys[i - 1]) / a;
    d = (ys[i + 1] - ys[i]) / b;

    if (c * d <= 0) {
      splines[i * 3] = 0;
    } else {
      splines[i * 3] = (3 * (a + b)) / ((a + 2 * b) / c + (2 * a + b) / d);
    }
  }

  for (let i = 0; i < m; ++i) {
    k = i * 3;
    a = splines[k];
    b = 1 / (xs[i + 1] - xs[i]);
    c = (ys[i + 1] - ys[i]) * b;
    d = a + splines[k + 3] - c - c;

    splines[k + 1] = (c - a - d) * b;
    splines[k + 2] = d * b * b;
  }
}
