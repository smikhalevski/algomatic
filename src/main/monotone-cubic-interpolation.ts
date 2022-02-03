import {MutableArrayLike} from './shared-types';

export function createMonotoneCubicInterpolant(xs: ArrayLike<number>, ys: ArrayLike<number>, n = xs.length): (x: number) => number {
  if (n === 0) {
    return () => NaN;
  }
  if (n === 1) {
    const y0 = ys[0];
    return () => y0;
  }

  const splines = populateMonotoneCubicCoeffs(xs, ys, n);
  return (x) => interpolateMonotoneCubic(xs, ys, x, n, splines);
}

export function interpolateMonotoneCubic(xs: ArrayLike<number>, ys: ArrayLike<number>, x: number, n: number, coeffs: MutableArrayLike<number>): number {

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

  // Search for the interval x is in, returning the corresponding y if x is one of the original xs
  let a = 0;
  let b = n;
  let i;

  while (a <= b) {
    i = a + b >> 1;

    const xi = xs[i];

    if (xi < x) {
      a = i + 1;
    } else if (xi > x) {
      b = i - 1;
    } else {
      return ys[i];
    }
  }

  i = b < 0 ? 0 : b;

  // Interpolate
  const s = i * L;
  const dx = x - xs[i];
  const dx2 = dx * dx;

  return ys[i] + coeffs[s + S1] * dx + coeffs[s + S2] * dx2 + coeffs[s + S3] * dx * dx2;
}

/**
 * Computes cubic curve coefficients for `xs` and `ys`.
 *
 * **Note:** This function doesn't do any checks of arguments for performance reasons.
 *
 * ```ts
 * const coeffs = new Float64Array(xs.length * 3 + 1);
 *
 * populateMonotoneCubicCoeffs(xs, ys, xs.length, coeffs);
 * ```
 *
 * @param xs The array of X coordinates of pivot points in ascending order. Length must be at least 2.
 * @param ys The array of corresponding Y coordinates of pivot points.
 * @param n The number of pivot points, usually equals `xs.length`.
 * @param coeffs Mutable `Float64Array` that would be populated with curve coefficients. Length must be `n * 3 + 1`.
 * @returns The `coeffs` array.
 */
export function populateMonotoneCubicCoeffs(xs: ArrayLike<number>, ys: ArrayLike<number>, n: number, coeffs?: MutableArrayLike<number>): MutableArrayLike<number> {

  // Degree coefficient offsets
  const D1 = 0;
  const D2 = 1;
  const D3 = 2;
  const L = 3; // Coefficient tuple length

  coeffs ||= new Float64Array(n * L + 1);

  const l = n - 1;

  // Degree-1 coefficients
  const dx0 = xs[1] - xs[0];
  const dy0 = ys[1] - ys[0];

  const dxl = xs[l] - xs[l - 1];
  const dyl = ys[l] - ys[l - 1];

  coeffs[0 * L + D1] = dy0 / dx0;
  coeffs[l * L + D1] = dyl / dxl;

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
      coeffs[i * L + D1] = 0;
    } else {
      const t = dxi + dxj;
      coeffs[i * L + D1] = 3 * t / ((t + dxj) / mi + (t + dxi) / mj);
    }
  }

  // Degree-2 and degree-3 coefficients
  for (let i = 0; i < l; ++i) {
    const s = i * L;

    const dx = xs[i + 1] - xs[i];
    const dy = ys[i + 1] - ys[i];

    const c1 = coeffs[s + D1];
    const m = dy / dx;
    const q = 1 / dx;
    const t = c1 + coeffs[s + L + D1] - m - m;

    coeffs[s + D2] = (m - c1 - t) * q;
    coeffs[s + D3] = t * q * q;
  }

  return coeffs;
}
