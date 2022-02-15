/**
 * If `value` is a function then the invocation result is returned. Otherwise `value` is returned as is.
 */
export function callOrGet<T, A extends unknown[]>(value: ((...args: A) => T) | T, ...args: A): T {
  return typeof value === 'function' ? (value as Function)(...args) : value;
}
