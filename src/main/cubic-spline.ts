/**
 * Returns a cubic spline interpolation function for given pivot points.
 *
 * **Note:** Don't mutate `xs` and `ys` arrays after creating this function since data from these arrays is read during
 * interpolation.
 *
 * @param xs X coordinates of pivot points.
 * @param ys Y coordinates of pivot points.
 * @returns The function that takes X coordinate and returns an interpolated Y coordinate.
 */
export function createCubicSplineInterpolant(xs: readonly number[], ys: readonly number[]): (x: number) => number {
  const splines = populateCubicSplines(xs, ys);
  return (x) => cubicSpline(xs, ys, x, splines);
}

/**
 * Computes `y` at `x` for a set of pivot points (`xs` and `ys`) using cubic spline interpolation.
 *
 * @param xs X coordinates of pivot points.
 * @param ys Y coordinates of pivot points.
 * @param x X coordinate of interpolated points.
 * @param splines Optional pre-computed splines. If omitted then splines are computed from `xs` and `ys` on the fly.
 * @returns Interpolated Y coordinate.
 *
 * @see {@link https://en.wikipedia.org/wiki/Spline_(mathematics)#Algorithm_for_computing_natural_cubic_splines Algorithm for computing natural cubic splines}
 */
export function cubicSpline(xs: readonly number[], ys: readonly number[], x: number, splines: readonly number[] = populateCubicSplines(xs, ys)): number {

  // Coefficient offsets in splines array
  const B = 0;
  const D = 1;
  const C = 2;
  const L = 3;

  const n = xs.length;

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
 * @param xs X coordinates of pivot points.
 * @param ys Y coordinates of pivot points.
 * @param [splines = []] Mutable array that would be populated with spline components.
 * @returns The `splines` array.
 */
export function populateCubicSplines(xs: readonly number[], ys: readonly number[], splines: number[] = [-0]): number[] {

  // Coefficient offsets in splines array
  const B = 0;
  const D = 1;
  const C = 2;
  const L = 3;

  const n = xs.length;

  // Prefill splines and preserve PACKED_DOUBLE_ELEMENTS type
  // https://v8.dev/blog/elements-kinds#avoid-elements-kind-transitions
  for (let i = splines.length; i < n * L; ++i) {
    splines.push(-0);
  }

  splines[B] = splines[C] = splines[D] = splines[(n - 1) * L + C] = 0;

  for (let i = 1; i < n - 1; ++i) {
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
