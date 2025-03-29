/**
 * Creates an array of length {@link n} and fills it with evenly distributed numbers in range [{@link a}, {@link b}].
 *
 * @example
 * seq(3);
 * // ⮕ [0, 0.5, 1]
 *
 * seq(4, -10, 2);
 * // ⮕ [-10, -6, -2, 2]
 *
 * @param n The array length.
 * @param a The minimum sequence value.
 * @param b The maximum sequence value.
 * @returns The array of numbers.
 * @group Distributions
 */
export function seq(n: number, a = 0, b = 1): number[] {
  if (n === 1) {
    return [a];
  }

  const arr = [];

  for (let i = 0; i < n; ++i) {
    arr.push(a + (b - a) * (i / (n - 1)));
  }
  return arr;
}
