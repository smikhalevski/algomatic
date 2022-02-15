import {Interpolator, MutableArrayLike} from '../shared-types';
import {binarySearch} from '../array';

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
 */
export function cspline(xs: ArrayLike<number>, ys: ArrayLike<number>): Interpolator {
  let n = -1;
  let splines: MutableArrayLike<number>;

  const interp: Interpolator = (x) => {
    if (n === 0) {
      return NaN;
    }
    if (n === 1) {
      return ys[0];
    }
    return interpolateCSpline(xs, ys, x, n, splines);
  };

  interp.update = (nextXs, nextYs) => {
    const nextN = Math.min(nextXs.length, nextYs.length);
    xs = nextXs;
    ys = nextYs;

    if (nextN > 1) {
      splines = createCSplines(xs, ys, nextN, n >= nextN ? splines : undefined);
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
 * Interpolates `y` at `x` using a natural cubic spline algorithm for a set of pivot points.
 *
 * **Note:** This function doesn't do any checks of arguments for performance reasons.
 *
 * ```ts
 * const y = interpolateCSpline(xs, ys, x, xs.length, createCSplines(xs, ys, xs.length));
 * ```
 *
 * @param xs The array of X coordinates of pivot points in ascending order, length must be at least 2.
 * @param ys The array of corresponding Y coordinates of pivot points.
 * @param x The X coordinate of interpolated point.
 * @param n The number of pivot points, usually equals `xs.length`.
 * @param splines The array of spline components, length must be `3 * n`.
 * @returns Interpolated Y coordinate.
 *
 * @see {@link createCSplines}
 * @see {@link https://en.wikipedia.org/wiki/Spline_(mathematics)#Algorithm_for_computing_natural_cubic_splines Algorithm for computing natural cubic splines}
 */
export function interpolateCSpline(xs: ArrayLike<number>, ys: ArrayLike<number>, x: number, n: number, splines: MutableArrayLike<number>): number {
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

  const t = i * T.SIZE;
  const dx = x - xs[i];

  return ys[i] + (splines[T.C + t] + (splines[T.A + t] / 2 + splines[T.B + t] * dx / 6) * dx) * dx;
}

/**
 * Computes cubic splines for given pivot points.
 *
 * **Note:** This function doesn't do any checks of arguments for performance reasons.
 *
 * ```ts
 * const splines = createCSplines(xs, ys, xs.length);
 * ```
 *
 * @param xs The array of X coordinates of pivot points in ascending order, length must be at least 2.
 * @param ys The array of corresponding Y coordinates of pivot points.
 * @param n The number of pivot points, usually equals `xs.length`.
 * @param splines Mutable array that would be populated with spline components, length must be at least `3 * n`.
 * @returns The `splines` array.
 */
export function createCSplines(xs: ArrayLike<number>, ys: ArrayLike<number>, n: number, splines?: MutableArrayLike<number>): MutableArrayLike<number> {
  splines ||= new Float32Array(n * T.SIZE);

  splines[T.A] = splines[T.B] = splines[T.C] = splines[T.A + (n - 1) * T.SIZE] = 0;

  for (let i = 1; i < n - 1; ++i) {
    const t = i * T.SIZE; // Tuple offset

    const xi = xs[i];
    const yi = ys[i];

    const a = xi - xs[i - 1];
    const b = xs[i + 1] - xi;
    const c = 2 * (a + b);
    const f = 6 * ((ys[i + 1] - yi) / b - (yi - ys[i - 1]) / a);
    const z = a * splines[T.B - T.SIZE + t] + c;

    // Temporary store to avoid excessive allocations
    splines[T.B + t] = -b / z;
    splines[T.C + t] = (f - a * splines[T.C - T.SIZE + t]) / z;
  }

  for (let i = n - 2; i > 0; --i) {
    const t = i * T.SIZE; // Tuple offset

    splines[T.A + t] = splines[T.B + t] * splines[T.A + T.SIZE + t] + splines[T.C + t];
  }

  for (let i = n - 1; i > 0; --i) {
    const t = i * T.SIZE; // Tuple offset

    const dx = xs[i] - xs[i - 1];
    const c1i = splines[T.A + t];
    const c1j = splines[T.A - T.SIZE + t];

    splines[T.B + t] = (c1i - c1j) / dx;
    splines[T.C + t] = dx * (2 * c1i + c1j) / 6 + (ys[i] - ys[i - 1]) / dx;
  }

  return splines;
}
