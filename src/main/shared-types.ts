export interface MutableArrayLike<T> {
  length: number;
  [n: number]: T;
}
