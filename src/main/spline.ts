const tempAs: number[] = [];
const tempBs: number[] = [];
const tempSplines: number[] = [];

/**
 * Computes splines for `xs` and `ys`.
 *
 * @param xs X coordinates of pivot points.
 * @param ys Y coordinates of pivot points.
 * @param splines Mutable array that would be populated with spline components. If omitted, a temp array is used.
 * @returns The splines array.
 */
export function populateSplines(xs: readonly number[], ys: readonly number[], splines = tempSplines): number[] {

  const B = 0;
  const C = 1;
  const D = 2;
  const L = 3;

  const n = xs.length;
  const as = tempAs;
  const bs = tempBs;

  for (let i = splines.length; i < n * L; ++i) {
    splines[i] = 0;
  }
  as[0] = bs[0] = 0;

  splines[C] = splines[(n - 1) * L + C] = 0;

  for (let i = 1; i < n - 1; ++i) {
    const xi = xs[i];
    const yi = ys[i];

    const a = xi - xs[i - 1];
    const b = xs[i + 1] - xi;
    const c = 2 * (a + b);
    const f = 6 * ((ys[i + 1] - yi) / b - (yi - ys[i - 1]) / a);
    const z = (a * as[i - 1] + c);

    as[i] = -b / z;
    bs[i] = (f - a * bs[i - 1]) / z;
  }

  for (let i = n - 2; i > 0; --i) {
    splines[i * L + C] = as[i] * splines[(i + 1) * L + C] + bs[i];
  }

  for (let i = n - 1; i > 0; --i) {
    const dx = xs[i] - xs[i - 1];
    const ci = splines[i * L + C];
    const cj = splines[(i - 1) * L + C];

    splines[i * L + D] = (ci - cj) / dx;
    splines[i * L + B] = dx * (2 * ci + cj) / 6 + (ys[i] - ys[i - 1]) / dx;
  }

  return splines;
}

/**
 * Computes cubic spline for `xs` and `ys` at `x` and returns interpolated `y`.
 *
 * @param xs X coordinates of pivot points.
 * @param ys Y coordinates of pivot points.
 * @param x X coordinate of interpolated points.
 * @param splines Optional pre-computed splines. If omitted then splines are computed from `xs` and `ys` on the fly.
 * @returns Interpolated Y coordinate.
 *
 * @see {@link https://en.wikipedia.org/wiki/Spline_(mathematics)#Algorithm_for_computing_natural_cubic_splines Algorithm for computing natural cubic splines}
 */
export function spline(xs: readonly number[], ys: readonly number[], x: number, splines: readonly number[] = populateSplines(xs, ys)): number {

  const B = 0;
  const C = 1;
  const D = 2;
  const L = 3;

  const n = xs.length;

  let s: number;

  if (x <= xs[0]) {
    s = 0;
  } else if (x >= xs[n - 1]) {
    s = (n - 1) * L;
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
    s = j * L;
  }

  const dx = x - xs[s / L];
  return ys[s / L] + (splines[s + B] + (splines[s + C] / 2 + splines[s + D] * dx / 6) * dx) * dx;
}
