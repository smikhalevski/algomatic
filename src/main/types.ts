/**
 * A function that maps a number to another number.
 *
 * @param value The input value.
 * @returns The output value.
 * @template I The input value.
 * @template O The output value.
 * @group Utils
 */
export type Mapper<I, O = I> = (value: I) => O;

/**
 * Compares `a` and `b` and returns:
 * - A negative number if `a` < `b`;
 * - A positive number if `a` > `b`;
 * - 0 if `a` is equal to `b`.
 *
 * @param a The first value.
 * @param b The second value.
 * @template T Compared values.
 * @group Utils
 */
export type Comparator<T> = (a: T, b: T) => number;

/**
 * An array like object with mutable elements.
 *
 * @template T The array element.
 * @group Utils
 */
export interface ArrayLike<T> {
  [index: number]: T;

  readonly length: number;
}

/**
 * Infers the value stored in an  array.
 *
 * @template T The array-like collection.
 * @group Utils
 */
export type ArrayValue<T extends ArrayLike<any>> = T extends ArrayLike<infer V> ? V : never;
