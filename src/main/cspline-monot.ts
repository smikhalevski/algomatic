import {Interpolator, MutableArrayLike} from './shared-types';
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
 * @returns The function that takes X coordinate and returns an interpolated Y coordinate.
 *
 * @see {@link https://en.wikipedia.org/wiki/Monotone_cubic_interpolation Monotone cubic interpolation}
 */
export function csplineMonot(xs: ArrayLike<number>, ys: ArrayLike<number>): Interpolator {
  let n = -1;
  let splines: MutableArrayLike<number>;

  const interp: Interpolator = (x) => {
    if (n === 0) {
      return NaN;
    }
    if (n === 1) {
      return ys[0];
    }
    return interpolateCSplineMonot(xs, ys, x, n, splines);
  };

  interp.update = (nextXs, nextYs) => {
    const nextN = Math.min(nextXs.length, nextYs.length);
    xs = nextXs;
    ys = nextYs;

    if (nextN > 1) {
      splines = createCSplinesMonot(xs, ys, nextN, n >= nextN ? splines : undefined);
    }
    n = nextN;
  };

  interp.update(xs, ys);

  return interp;
}

const enum T {
  A = 0,
  B = 1,
  C = 2,

  // The size of a single spline tuple
  SIZE = 3,
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
 * @param xs The array of X coordinates of pivot points in ascending order, length must be al least 2.
 * @param ys The array of corresponding Y coordinates of pivot points.
 * @param x The X coordinate of interpolated point.
 * @param n The number of pivot points, usually equals `xs.length`.
 * @param splines The array of spline components, length must be `3 * n - 2`.
 * @returns Interpolated Y coordinate.
 *
 * @see {@link https://en.wikipedia.org/wiki/Monotone_cubic_interpolation Monotone cubic interpolation}
 */
export function interpolateCSplineMonot(xs: ArrayLike<number>, ys: ArrayLike<number>, x: number, n: number, splines: MutableArrayLike<number>): number {
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

  const t = i * T.SIZE;
  const dx = x - xs[i];
  const dx2 = dx * dx;

  return ys[i] + splines[T.A + t] * dx + splines[T.B + t] * dx2 + splines[T.C + t] * dx * dx2;
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
 * @param xs The array of X coordinates of pivot points in ascending order, length must be at least 2.
 * @param ys The array of corresponding Y coordinates of pivot points.
 * @param n The number of pivot points, usually equals `xs.length`.
 * @param splines Mutable array that would be populated with spline components, length must be at least `3 * n - 2`.
 * @returns The `splines` array.
 *
 * @see {@link https://en.wikipedia.org/wiki/Monotone_cubic_interpolation Monotone cubic interpolation}
 */
export function createCSplinesMonot(xs: ArrayLike<number>, ys: ArrayLike<number>, n: number, splines?: MutableArrayLike<number>): MutableArrayLike<number> {
  const l = n - 1;

  splines ||= new Float32Array(l * T.SIZE + 1);

  // Degree-1 coefficients
  const dx0 = xs[1] - xs[0];
  const dy0 = ys[1] - ys[0];

  const dxl = xs[l] - xs[l - 1];
  const dyl = ys[l] - ys[l - 1];

  splines[0 * T.SIZE + T.A] = dy0 / dx0;
  splines[l * T.SIZE + T.A] = dyl / dxl;

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
      splines[i * T.SIZE + T.A] = 0;
    } else {
      const t = dxi + dxj;
      splines[i * T.SIZE + T.A] = 3 * t / ((t + dxj) / mi + (t + dxi) / mj);
    }
  }

  // Degree-2 and degree-3 coefficients
  for (let i = 0; i < l; ++i) {
    const t = i * T.SIZE;

    const dx = xs[i + 1] - xs[i];
    const dy = ys[i + 1] - ys[i];

    const a = splines[T.A + t];
    const m = dy / dx;
    const q = 1 / dx;
    const z = a + splines[T.A + T.SIZE + t] - m - m;

    splines[T.B + t] = (m - a - z) * q;
    splines[T.C + t] = z * q * q;
  }

  return splines;
}
