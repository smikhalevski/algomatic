interface ISpline {
  a: number;
  b: number;
  c: number;
  d: number;
  x: number;
}

const A = 0;
const B = 1;
const C = 2;
const D = 3;
const X = 4;
const L = 5;

const as: number[] = [];
const bs: number[] = [];

function calcSplines(xs: number[], ys: number[], splines: number[]): number[] {
  const n = xs.length;

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
    splines[i * L + D] = (splines[i * L + C] - splines[(i - 1) * L + C]) / dx;
    splines[i * L + B] = dx * (2 * splines[i * L + C] + splines[(i - 1) * L + C]) / 6 + (ys[i] - ys[i - 1]) / dx;
  }

  return splines;
}

/**
 * Creates cubic spline for `xs` and `ys` and returns function that takes any `x` and returns interpolated `y`.
 *
 * @see https://en.wikipedia.org/wiki/Spline_(mathematics)#Algorithm_for_computing_natural_cubic_splines
 */
export function createSplineMap(xs: number[], ys: number[]): (x: number) => number {
  const n = xs.length;
  const splines: number[] = [];

  calcSplines(xs, ys, splines);

  return (x) => {
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
  };
}
