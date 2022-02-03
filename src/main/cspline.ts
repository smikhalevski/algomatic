import {MutableArrayLike} from './shared-types';
import {binarySearch} from './math';

/**
 * Returns a cubic spline interpolation function for given pivot points.
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
 * @param [n = xs.length] The number of pivot points.
 * @returns The function that takes X coordinate and returns an interpolated Y coordinate.
 */
export function cspline(xs: ArrayLike<number>, ys: ArrayLike<number>, n = xs.length): (x: number) => number {
  if (n === 0) {
    return () => NaN;
  }
  if (n === 1) {
    const y0 = ys[0];
    return () => y0;
  }

  const splines = createCSplines(xs, ys, n);
  return (x) => interpolateCSpline(xs, ys, x, n, splines);
}

/**
 * Computes `y` at `x` for a set of pivot points (`xs` and `ys`) using cubic spline interpolation.
 *
 * **Note:** This function doesn't do any checks of arguments for performance reasons.
 *
 * ```ts
 * const y = interpolateCSpline(xs, ys, x, xs.length, createCSplines(xs, ys, xs.length));
 * ```
 *
 * @param xs The array of X coordinates of pivot points in ascending order. Length must be al least 2.
 * @param ys The array of corresponding Y coordinates of pivot points.
 * @param x The X coordinate of interpolated point.
 * @param n The number of pivot points, usually equals `xs.length`.
 * @param splines The array of spline components. Length must be `n * 3`.
 * @returns Interpolated Y coordinate.
 *
 * @see {@link https://en.wikipedia.org/wiki/Spline_(mathematics)#Algorithm_for_computing_natural_cubic_splines Algorithm for computing natural cubic splines}
 */
export function interpolateCSpline(xs: ArrayLike<number>, ys: ArrayLike<number>, x: number, n: number, splines: MutableArrayLike<number>): number {

  // Coefficient offsets in splines array
  const B = 0;
  const D = 1;
  const C = 2;
  const L = 3; // Spline tuple length

  let i;

  if (x <= xs[0]) {
    i = 0;
  } else if (x >= xs[n - 1]) {
    i = n - 1;
  } else {
    const t = binarySearch(x, xs, n);

    if (t >= 0) {
      return ys[t];
    }
    i = ~t;
  }

  const s = i * L;
  const dx = x - xs[i];
  return ys[i] + (splines[s + B] + (splines[s + C] / 2 + splines[s + D] * dx / 6) * dx) * dx;
}

/**
 * Computes splines for `xs` and `ys`.
 *
 * **Note:** This function doesn't do any checks of arguments for performance reasons.
 *
 * ```ts
 * const splines = createCSplines(xs, ys, xs.length);
 * ```
 *
 * @param xs The array of X coordinates of pivot points in ascending order. Length must be at least 2.
 * @param ys The array of corresponding Y coordinates of pivot points.
 * @param n The number of pivot points, usually equals `xs.length`.
 * @param splines Mutable array that would be populated with spline components. Length must be `n * 3`.
 * @returns The `splines` array.
 */
export function createCSplines(xs: ArrayLike<number>, ys: ArrayLike<number>, n: number, splines?: MutableArrayLike<number>): MutableArrayLike<number> {

  // Coefficient offsets in splines array
  const B = 0;
  const D = 1;
  const C = 2;
  const L = 3; // Spline tuple length
  const l = n - 1;

  splines ||= new Float64Array(n * L);
  splines[B] = splines[C] = splines[D] = splines[l * L + C] = 0;

  for (let i = 1; i < l; ++i) {
    // Spline offset
    const s = i * L;

    const xi = xs[i];
    const yi = ys[i];

    const a = xi - xs[i - 1];
    const b = xs[i + 1] - xi;
    const c = 2 * (a + b);
    const f = 6 * ((ys[i + 1] - yi) / b - (yi - ys[i - 1]) / a);
    const z = a * splines[s - L + D] + c;

    // D and B offsets are temporary used to store a and b coefficients
    splines[s + D] = -b / z;
    splines[s + B] = (f - a * splines[s - L + B]) / z;
  }

  for (let i = n - 2; i > 0; --i) {
    const s = i * L;
    splines[s + C] = splines[s + D] * splines[s + L + C] + splines[s + B];
  }

  for (let i = n - 1; i > 0; --i) {
    const s = i * L;

    const dx = xs[i] - xs[i - 1];
    const ci = splines[s + C];
    const cj = splines[s - L + C];

    splines[s + D] = (ci - cj) / dx;
    splines[s + B] = dx * (2 * ci + cj) / 6 + (ys[i] - ys[i - 1]) / dx;
  }

  return splines;
}
