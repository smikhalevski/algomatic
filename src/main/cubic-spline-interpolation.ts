import {MutableArrayLike} from './shared-types';

/**
 * Returns a cubic spline interpolation function for given pivot points.
 *
 * **Notes:** Don't mutate `xs` and `ys` arrays after creating this function since data from these arrays is read during
 * interpolation.
 *
 * ```ts
 * const f = createCubicSplineInterpolant(xs, ys);
 * const y = f(x);
 * ```
 *
 * @param xs The array of X coordinates of pivot points in ascending order.
 * @param ys The array of corresponding Y coordinates of pivot points.
 * @param [n = xs.length] The number of pivot points.
 * @returns The function that takes X coordinate and returns an interpolated Y coordinate.
 */
export function createCubicSplineInterpolant(xs: ArrayLike<number>, ys: ArrayLike<number>, n = xs.length): (x: number) => number {
  if (n === 0) {
    return () => NaN;
  }
  if (n === 1) {
    const y0 = ys[0];
    return () => y0;
  }

  const splines = populateCubicSplines(xs, ys, n);
  return (x) => interpolateCubicSpline(xs, ys, x, n, splines);
}

/**
 * Computes `y` at `x` for a set of pivot points (`xs` and `ys`) using cubic spline interpolation.
 *
 * **Note:** This function doesn't do any checks of arguments for performance reasons.
 *
 * ```ts
 * const y = interpolateCubicSpline(xs, ys, x, populateCubicSplines(xs, ys, []));
 * ```
 *
 * @param xs The array of X coordinates of pivot points in ascending order. Length must be al least 2.
 * @param ys The array of corresponding Y coordinates of pivot points.
 * @param x X coordinate of interpolated points.
 * @param n The number of pivot points, usually equals `xs.length`.
 * @param splines The `Float64Array` of spline components. Length must be `n * 3`.
 * @returns Interpolated Y coordinate.
 *
 * @see {@link https://en.wikipedia.org/wiki/Spline_(mathematics)#Algorithm_for_computing_natural_cubic_splines Algorithm for computing natural cubic splines}
 */
export function interpolateCubicSpline(xs: ArrayLike<number>, ys: ArrayLike<number>, x: number, n: number, splines: MutableArrayLike<number>): number {

  // Coefficient offsets in splines array
  const B = 0;
  const D = 1;
  const C = 2;
  const L = 3; // Spline tuple length

  let p: number;

  if (x <= xs[0]) {
    p = 0;
  } else if (x >= xs[n - 1]) {
    p = n - 1;
  } else {
    let i = 0;
    let j = n - 1;

    while (i + 1 < j) {
      const k = i + (j - i) / 2;

      if (x <= xs[k]) {
        j = k;
      } else {
        i = k;
      }
    }
    p = j;
  }

  const s = p * L;
  const dx = x - xs[p];
  return ys[p] + (splines[s + B] + (splines[s + C] / 2 + splines[s + D] * dx / 6) * dx) * dx;
}

/**
 * Computes splines for `xs` and `ys`.
 *
 * **Note:** This function doesn't do any checks of arguments for performance reasons.
 *
 * ```ts
 * const splines = new Float64Array(xs.length * 3);
 *
 * populateCubicSplines(xs, ys, xs.length, splines);
 * ```
 *
 * @param xs The array of X coordinates of pivot points in ascending order. Length must be at least 2.
 * @param ys The array of corresponding Y coordinates of pivot points.
 * @param n The number of pivot points, usually equals `xs.length`.
 * @param splines Mutable `Float64Array` that would be populated with spline components. Length must be `n * 3`.
 * @returns The `splines` array.
 * @see {@link https://v8.dev/blog/elements-kinds#avoid-elements-kind-transitions V8 avoid elements kind transitions}
 */
export function populateCubicSplines(xs: ArrayLike<number>, ys: ArrayLike<number>, n: number, splines?: MutableArrayLike<number>): MutableArrayLike<number> {

  // Coefficient offsets in splines array
  const B = 0;
  const D = 1;
  const C = 2;
  const L = 3; // Spline tuple length

  splines ||= new Float64Array(n * L);

  const l = n - 1;

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
