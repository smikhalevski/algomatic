/**
 * A function that maps a number to another number.
 */
export type Mapper = (x: number) => number;

/**
 * Compares `a` and `b` and returns:
 * - A negative number if `a` < `b`;
 * - A positive number if `a` > `b`;
 * - 0 if `a` is equal to `b`.
 */
export type Comparator<T> = (a: T, b: T) => number;

/**
 * An interpolator function.
 *
 * @group Interpolation
 */
export interface Interpolator extends Mapper {
  update(xs: ArrayLike<number>, ys: ArrayLike<number>): void;
}

export interface MutableArrayLike<T> {
  [index: number]: T;

  readonly length: number;
}

/**
 * Infers an array value type.
 */
export type ArrayValue<T extends ArrayLike<unknown>> = T extends ArrayLike<infer E> ? E : never;
