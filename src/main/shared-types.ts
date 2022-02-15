export interface Interpolator {
  (x: number): number;

  update(xs: ArrayLike<number>, ys: ArrayLike<number>): void;
}

export interface MutableArrayLike<T> {
  length: number;

  [n: number]: T;
}

/**
 * Infers a type of an array value.
 */
export type ArrayElement<T extends ArrayLike<unknown>> = T extends ArrayLike<infer E> ? E : never;

/**
 * Compares `a` and `b` and returns:
 * - Negative number if `a` < `b`;
 * - Positive number if `a` > `b`;
 * - 0 if `a` is equal to `b`.
 */
export type Comparator<T> = (a: T, b: T) => number;

/**
 * The easing function that receives `t` ∈ [0, 1] and return a mapped value.
 */
export type Easing = (t: number) => number;
