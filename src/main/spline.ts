const A = 0;
const B = 1;
const C = 2;
const D = 3;
const X = 4;
const L = 5;

const tempAs: number[] = [];
const tempBs: number[] = [];
const tempSplines: number[] = [];

/**
 * Computes splines for `xs` and `ys`.
 */
export function populateSplines(xs: number[], ys: number[], splines = tempSplines): number[] {
  const n = xs.length;
  const as = tempAs;
  const bs = tempBs;

  for (let i = 0; i < n * L; ++i) {
    splines[i] = 0;
  }
  for (let i = 0; i < n - 1; ++i) {
    as[i] = bs[i] = 0;
  }
  for (let i = 0; i < n; ++i) {
    splines[i * L + X] = xs[i];
    splines[i * L + A] = ys[i];
  }

  splines[C] = splines[(n - 1) * L + C] = 0;

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
    splines[i * L + C] = as[i] * splines[(i + 1) * L + C] + bs[i];
  }

  for (let i = n - 1; i > 0; --i) {
    const dx = xs[i] - xs[i - 1];
    const sc1 = splines[(i - 1) * L + C];
    const sc2 = splines[i * L + C];

    splines[i * L + D] = (sc2 - sc1) / dx;
    splines[i * L + B] = dx * (2 * sc2 + sc1) / 6 + (ys[i] - ys[i - 1]) / dx;
  }

  return splines;
}

/**
 * Computes cubic spline for `xs` and `ys` at `x` and returns interpolated `y`.
 *
 * @param xs X coordinates of points.
 * @param ys Y coordinates of points.
 * @param x X coordinate of interpolated points.
 * @param splines Optional pre-computed splines. If omitted then splines are computed from `xs` and `ys` on the fly.
 * @returns Interpolated Y coordinate.
 *
 * @see {@link https://en.wikipedia.org/wiki/Spline_(mathematics)#Algorithm_for_computing_natural_cubic_splines Algorithm for computing natural cubic splines}
 */
export function spline(xs: number[], ys: number[], x: number, splines = populateSplines(xs, ys)): number {
  const n = xs.length;

  let s: number;

  if (x <= splines[X]) {
    s = 0;
  } else if (x >= splines[(n - 1) * L + X]) {
    s = (n - 1) * L;
  } else {
    let i = 0;
    let j = n - 1;

    while (i + 1 < j) {
      const k = i + (j - i) / 2;
      if (x <= splines[k * L + X]) {
        j = k;
      } else {
        i = k;
      }
    }
    s = j * L;
  }

  const dx = x - splines[s + X];
  return splines[s + A] + (splines[s + B] + (splines[s + C] / 2 + splines[s + D] * dx / 6) * dx) * dx;
}
