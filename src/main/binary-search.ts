/**
 * Searches the specified array `xs` for the specified value `x` using the binary search algorithm. The array must be
 * sorted into ascending order according to the natural ordering of its elements prior to making this call. If it is
 * not sorted, the results are undefined.
 *
 * @param xs The array to be searched.
 * @param x The value to be searched for.
 * @param [n = xs.length] The maximum index in `xs` that is searched (exclusive).
 * @param comparator The callback that defines the sort order. If omitted, the array elements are compared using
 *     comparison operators.
 * @returns The index of the searched value, if it is contained in the array; otherwise, `-insertionPoint - 1`. The
 *     insertion point is defined as the point at which the searched value would be inserted into the array: the index
 *     of the first element greater than the searched value, or array length if all elements in the array are less than
 *     the specified key. Note that this guarantees that the return value will be ≥ 0 if and only if the searched value
 *     is found.
 */
export function binarySearch<T>(xs: ArrayLike<T>, x: T, n = xs.length, comparator?: (a: T, b: T) => number): number {
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
