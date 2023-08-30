import { ArrayValue, MutableArrayLike } from './types';

/**
 * Copies an array from the specified source array, beginning at the specified position, to the specified position of
 * the destination array.
 *
 * @param src The source array.
 * @param dest The destination array.
 * @param srcIndex The start position in the source array.
 * @param destIndex The start position in the destination array.
 * @param n The number of elements to copy.
 * @returns The destination array.
 * @template T The destination array.
 * @group Arrays
 */
export function copyOver<T extends MutableArrayLike<any>>(
  src: ArrayLike<ArrayValue<T>>,
  dest: T,
  srcIndex = 0,
  destIndex = 0,
  n = src.length
): T {
  for (let i = 0; i < n; i++) {
    dest[destIndex + i] = src[srcIndex + i];
  }
  return dest;
}
