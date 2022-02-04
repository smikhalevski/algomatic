export function binarySearch<T>(x: T, xs: ArrayLike<T>, n = xs.length, comparator?: (a: T, b: T) => number): number {
  let m = 0;
  --n;

  if (comparator) {
    while (m <= n) {
      const i = n + m >> 1;
      const t = comparator(xs[i], x);

      if (t < 0) {
        m = i + 1;
      } else if (t > 0) {
        n = i - 1;
      } else {
        return i;
      }
    }
  } else {
    while (m <= n) {
      const i = n + m >> 1;
      const xi = xs[i];

      if (xi < x) {
        m = i + 1;
      } else if (xi > x) {
        n = i - 1;
      } else {
        return i;
      }
    }
  }
  return -m - 1;
}
