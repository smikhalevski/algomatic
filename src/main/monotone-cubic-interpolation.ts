export function createMonotoneCubicInterpolant(xs: number[], ys: number[]): (x: number) => number {
  const coeffs = populateMonotoneCubicCoeffs(xs, ys, [-0]);
  return (x) => interpolateMonotoneCubic(xs, ys, x, coeffs);
}

export function interpolateMonotoneCubic(xs: readonly number[], ys: readonly number[], x: number, coeffs: readonly number[]): number {

  const S1 = 0;
  const S2 = 1;
  const S3 = 2;
  const L = 3;

  const n = xs.length;

  // The rightmost point in the dataset should give an exact result
  if (x === xs[n - 1]) {
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

export function populateMonotoneCubicCoeffs(xs: readonly number[], ys: readonly number[], coeffs: number[]): number[] {

  const S1 = 0;
  const S2 = 1;
  const S3 = 2;
  const L = 3;

  const n = xs.length;

  // Degree-1 coefficients

  coeffs[0] = (ys[1] - ys[0]) / (xs[1] - xs[0]);
  coeffs[(n - 1) * L + S1] = (ys[n - 1] - ys[n - 2]) / (xs[n - 1] - xs[n - 2]);

  for (let i = 1; i < n - 1; ++i) {
    const xi = xs[i];
    const yi = ys[i];

    const dxi = xi - xs[i - 1];
    const dyi = yi - ys[i - 1];
    const dxj = xs[i + 1] - xi;
    const dyj = ys[i + 1] - yi;

    const mi = dyi / dxi;
    const mj = dyj / dxj;

    if (mi * mj <= 0) {
      coeffs[i * L + S1] = 0;
    } else {
      const t = dxi + dxj;

      coeffs[i * L + S1] = 3 * t / ((t + dxj) / mi + (t + dxi) / mj);
    }
  }

  // Degree-2 and degree-3 coefficients
  for (let i = 0; i < n; i++) {
    const s = i * L;

    const dx = xs[i + 1] - xs[i];
    const dy = ys[i + 1] - ys[i];

    const s1 = coeffs[s + S1];
    const m = dy / dx;
    const q = 1 / dx;
    const t = s1 + coeffs[s + L + S1] - m - m;

    coeffs[s + S2] = (m - s1 - t) * q;
    coeffs[s + S3] = t * q * q;
  }

  return coeffs;
}
