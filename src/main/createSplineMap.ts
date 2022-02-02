interface ISpline {
  a: number;
  b: number;
  c: number;
  d: number;
  x: number;
}

function calcSplines(xs: Array<number>, ys: Array<number>): Array<ISpline> {
  const splines = new Array<ISpline>();

  for (let i = 0; i < xs.length; i++) {
    splines[i] = {a: 0, b: 0, c: 0, d: 0, x: 0};
  }

  const n = xs.length;
  for (let i = 0; i < n; i++) {
    splines[i].x = xs[i];
    splines[i].a = ys[i];
  }
  splines[0].c = splines[n - 1].c = 0;

  const as = new Array(n - 1).fill(0);
  const bs = new Array(n - 1).fill(0);

  for (let i = 1; i < n - 1; ++i) {
    const a = xs[i] - xs[i - 1];
    const b = xs[i + 1] - xs[i];
    const c = 2 * (a + b);
    const f = 6 * ((ys[i + 1] - ys[i]) / b - (ys[i] - ys[i - 1]) / a);
    const z = (a * as[i - 1] + c);

    as[i] = -b / z;
    bs[i] = (f - a * bs[i - 1]) / z;
  }

  for (let i = n - 2; i > 0; --i) {
    splines[i].c = as[i] * splines[i + 1].c + bs[i];
  }

  for (let i = n - 1; i > 0; --i) {
    const dx = xs[i] - xs[i - 1];
    splines[i].d = (splines[i].c - splines[i - 1].c) / dx;
    splines[i].b = dx * (2 * splines[i].c + splines[i - 1].c) / 6 + (ys[i] - ys[i - 1]) / dx;
  }

  return splines;
}

/**
 * Creates cubic spline for `xs` and `ys` and returns function that takes any `x` and returns interpolated `y`.
 *
 * @see https://en.wikipedia.org/wiki/Spline_(mathematics)#Algorithm_for_computing_natural_cubic_splines
 */
export function createSplineMap(xs: Array<number>, ys: Array<number>): (x: number) => number {
  const splines = calcSplines(xs, ys);
  const n = splines.length;

  return (x) => {
    let s;

    if (x <= splines[0].x) {
      s = splines[0];
    } else if (x >= splines[n - 1].x) {
      s = splines[n - 1];
    } else {
      let i = 0;
      let j = n - 1;

      while (i + 1 < j) {
        const k = i + (j - i) / 2;
        if (x <= splines[k].x) {
          j = k;
        } else {
          i = k;
        }
      }
      s = splines[j];
    }

    const dx = x - s.x;
    return s.a + (s.b + (s.c / 2 + s.d * dx / 6) * dx) * dx;
  };
}
