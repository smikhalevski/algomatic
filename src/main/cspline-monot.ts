import {MutableArrayLike} from './shared-types';
import {binarySearch} from './binary-search';

/**
 * Returns a monotonous cubic spline interpolation function for given pivot points, that prevent overshoot of
 * interpolated values.
 *
 * **Notes:** Don't mutate `xs` and `ys` arrays after creating this function since data from these arrays is read
 * during interpolation.
 *
 * ```ts
 * const f = csplineMonot(xs, ys);
 * const y = f(x);
 * ```
 *
 * @param xs The array of X coordinates of pivot points in ascending order.
 * @param ys The array of corresponding Y coordinates of pivot points.
 * @param [n = xs.length] The number of pivot points.
 * @returns The function that takes X coordinate and returns an interpolated Y coordinate.
 *
 * @see {@link https://en.wikipedia.org/wiki/Monotone_cubic_interpolation Monotone cubic interpolation}
 */
export function csplineMonot(xs: ArrayLike<number>, ys: ArrayLike<number>, n = xs.length): (x: number) => number {
  if (n === 0) {
    return () => NaN;
  }
  if (n === 1) {
    const y0 = ys[0];
    return () => y0;
  }

  const splines = createCSplinesMonot(xs, ys, n);
  return (x) => interpolateCSplineMonot(xs, ys, x, n, splines);
}

/**
 * Computes `y` at `x` for a set of pivot points (`xs` and `ys`) using monotonous cubic spline interpolation that
 * prevents overshoot of interpolated values.
 *
 * **Note:** This function doesn't do any checks of arguments for performance reasons.
 *
 * ```ts
 * const y = interpolateCSplineMonot(xs, ys, x, xs.length, createCSplinesMonot(xs, ys, xs.length));
 * ```
 *
 * @param xs The array of X coordinates of pivot points in ascending order. Length must be al least 2.
 * @param ys The array of corresponding Y coordinates of pivot points.
 * @param x The X coordinate of interpolated point.
 * @param n The number of pivot points, usually equals `xs.length`.
 * @param splines The array of spline components. Length must be `(n - 1) * 3 + 1`.
 * @returns Interpolated Y coordinate.
 *
 * @see {@link https://en.wikipedia.org/wiki/Monotone_cubic_interpolation Monotone cubic interpolation}
 */
export function interpolateCSplineMonot(xs: ArrayLike<number>, ys: ArrayLike<number>, x: number, n: number, splines: MutableArrayLike<number>): number {

  const S1 = 0;
  const S2 = 1;
  const S3 = 2;
  const L = 3;

  if (x <= xs[0]) {
    return ys[0];
  }
  if (x >= xs[n - 1]) {
    return ys[n - 1];
  }

  const t = binarySearch(x, xs, n);

  if (t >= 0) {
    return ys[t];
  }

  const i = ~t - 1;
  const s = i * L;
  const dx = x - xs[i];
  const dx2 = dx * dx;

  return ys[i] + splines[s + S1] * dx + splines[s + S2] * dx2 + splines[s + S3] * dx * dx2;
}

/**
 * Computes monotonous splines for `xs` and `ys` that prevents overshoot of interpolated values.
 *
 * **Note:** This function doesn't do any checks of arguments for performance reasons.
 *
 * ```ts
 * const splines = createCSplinesMonot(xs, ys, xs.length);
 * ```
 *
 * @param xs The array of X coordinates of pivot points in ascending order. Length must be at least 2.
 * @param ys The array of corresponding Y coordinates of pivot points.
 * @param n The number of pivot points, usually equals `xs.length`.
 * @param splines Mutable array that would be populated with spline components. Length must be `(n - 1) * 3 + 1`.
 * @returns The `splines` array.
 *
 * @see {@link https://en.wikipedia.org/wiki/Monotone_cubic_interpolation Monotone cubic interpolation}
 */
export function createCSplinesMonot(xs: ArrayLike<number>, ys: ArrayLike<number>, n: number, splines?: MutableArrayLike<number>): MutableArrayLike<number> {

  // Degree coefficient offsets
  const D1 = 0;
  const D2 = 1;
  const D3 = 2;
  const L = 3; // Coefficient tuple length
  const l = n - 1;

  splines ||= new Float64Array(l * L + 1);

  // Degree-1 coefficients
  const dx0 = xs[1] - xs[0];
  const dy0 = ys[1] - ys[0];

  const dxl = xs[l] - xs[l - 1];
  const dyl = ys[l] - ys[l - 1];

  splines[0 * L + D1] = dy0 / dx0;
  splines[l * L + D1] = dyl / dxl;

  for (let i = 1; i < l; ++i) {
    const xi = xs[i];
    const yi = ys[i];

    const dxi = xi - xs[i - 1];
    const dyi = yi - ys[i - 1];
    const dxj = xs[i + 1] - xi;
    const dyj = ys[i + 1] - yi;

    const mi = dyi / dxi;
    const mj = dyj / dxj;

    if (mi * mj <= 0) {
      splines[i * L + D1] = 0;
    } else {
      const t = dxi + dxj;
      splines[i * L + D1] = 3 * t / ((t + dxj) / mi + (t + dxi) / mj);
    }
  }

  // Degree-2 and degree-3 coefficients
  for (let i = 0; i < l; ++i) {
    const s = i * L;

    const dx = xs[i + 1] - xs[i];
    const dy = ys[i + 1] - ys[i];

    const c1 = splines[s + D1];
    const m = dy / dx;
    const q = 1 / dx;
    const t = c1 + splines[s + L + D1] - m - m;

    splines[s + D2] = (m - c1 - t) * q;
    splines[s + D3] = t * q * q;
  }

  return splines;
}
