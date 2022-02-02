const enum Shift {
  A = 0,
  B = 1,
  C = 2,
  D = 3,
  X = 4,
  L = 5,
}

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
  const n = xs.length;
  const as = tempAs;
  const bs = tempBs;

  for (let i = 0; i < n * Shift.L; ++i) {
    splines[i] = 0;
  }
  for (let i = 0; i < n - 1; ++i) {
    as[i] = bs[i] = 0;
  }
  for (let i = 0; i < n; ++i) {
    splines[i * Shift.L + Shift.X] = xs[i];
    splines[i * Shift.L + Shift.A] = ys[i];
  }

  splines[Shift.C] = splines[(n - 1) * Shift.L + Shift.C] = 0;

  for (let i = 1; i < n - 1; ++i) {
    const xsi = xs[i];
    const ysi = ys[i];

    const a = xsi - xs[i - 1];
    const b = xs[i + 1] - xsi;
    const c = 2 * (a + b);
    const f = 6 * ((ys[i + 1] - ysi) / b - (ysi - ys[i - 1]) / a);
    const z = (a * as[i - 1] + c);

    as[i] = -b / z;
    bs[i] = (f - a * bs[i - 1]) / z;
  }

  for (let i = n - 2; i > 0; --i) {
    splines[i * Shift.L + Shift.C] = as[i] * splines[(i + 1) * Shift.L + Shift.C] + bs[i];
  }

  for (let i = n - 1; i > 0; --i) {
    const dx = xs[i] - xs[i - 1];
    const sc1 = splines[(i - 1) * Shift.L + Shift.C];
    const sc2 = splines[i * Shift.L + Shift.C];

    splines[i * Shift.L + Shift.D] = (sc2 - sc1) / dx;
    splines[i * Shift.L + Shift.B] = dx * (2 * sc2 + sc1) / 6 + (ys[i] - ys[i - 1]) / dx;
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
  const n = xs.length;

  let s: number;

  if (x <= splines[Shift.X]) {
    s = 0;
  } else if (x >= splines[(n - 1) * Shift.L + Shift.X]) {
    s = (n - 1) * Shift.L;
  } else {
    let i = 0;
    let j = n - 1;

    while (i + 1 < j) {
      const k = i + (j - i) / 2;
      if (x <= splines[k * Shift.L + Shift.X]) {
        j = k;
      } else {
        i = k;
      }
    }
    s = j * Shift.L;
  }

  const dx = x - splines[s + Shift.X];
  return splines[s + Shift.A] + (splines[s + Shift.B] + (splines[s + Shift.C] / 2 + splines[s + Shift.D] * dx / 6) * dx) * dx;
}
