import { qsort } from '../main';

test('returns the input array of 0', () => {
  const arr: unknown[] = [];

  expect(qsort(arr)).toBe(arr);
  expect(arr).toEqual([]);
});

test('returns the input array of 1', () => {
  const arr = [0];

  expect(qsort(arr)).toBe(arr);
  expect(arr).toEqual([0]);
});

test('returns the input array of 2', () => {
  const arr = [0, 0];

  expect(qsort(arr)).toBe(arr);
  expect(arr).toEqual([0, 0]);
});

test('sorts an array of 2', () => {
  const arr = [1, 0];

  expect(qsort(arr)).toEqual([0, 1]);
});

test('sorts an array of 3', () => {
  const arr = [2, 0, 1];

  expect(qsort(arr)).toEqual([0, 1, 2]);
});

test('sorts an array of 4', () => {
  const arr = [3, 4, 2, 1];

  expect(qsort(arr)).toEqual([1, 2, 3, 4]);
});

test('sorts the sorted array of 4', () => {
  const arr = [0, 1, 2, 3];

  expect(qsort(arr)).toEqual([0, 1, 2, 3]);
});

test('sorts the sorted array of 4 with swap callback', () => {
  const arr = [0, 1, 2, 3];
  const swapMock = jest.fn();

  expect(qsort(arr, swapMock)).toEqual([0, 1, 2, 3]);
  expect(swapMock.mock.calls).toEqual([]);
});

test('sorts an array of 2 with swap callback', () => {
  const arr = [1, 0];
  const swapMock = jest.fn();

  expect(qsort(arr, swapMock)).toEqual([0, 1]);
  expect(swapMock.mock.calls).toEqual([[0, 1]]);
});

test('sorts an array of 3 with swap callback', () => {
  const arr = [2, 0, 1];
  const swapMock = jest.fn();

  expect(qsort(arr, swapMock)).toEqual([0, 1, 2]);
  expect(swapMock.mock.calls).toEqual([
    [0, 2],
    [0, 1],
  ]);
});

test('sorts an array of 4 with swap callback', () => {
  const arr = [3, 4, 2, 1];
  const swapMock = jest.fn();

  expect(qsort(arr, swapMock)).toEqual([1, 2, 3, 4]);
  expect(swapMock.mock.calls).toEqual([
    [0, 3], // → [1, 4, 2, 3]
    [1, 2], // → [1, 2, 4, 3]
    [2, 3], // → [1, 2, 3, 4]
  ]);
});

test('sorts an array of 5 with a single swap', () => {
  const arr = [2, 1, 1, 1, 0];
  const swapMock = jest.fn();

  expect(qsort(arr, swapMock)).toEqual([0, 1, 1, 1, 2]);
  expect(swapMock.mock.calls).toEqual([[0, 4]]);
});

test('sorts before the swap call', () => {
  const arr = [3, 4, 2, 1];
  const swapMock = jest.fn();

  swapMock.mockImplementationOnce(() => undefined);
  swapMock.mockImplementationOnce(() => {
    throw new Error();
  });

  expect(() => qsort(arr, swapMock)).toThrow();

  expect(arr).toEqual([1, 2, 4, 3]);
  expect(swapMock.mock.calls).toEqual([
    [0, 3],
    [1, 2],
  ]);
});

test('uses comparator to sort', () => {
  const arr = [3, 4, 2, 1];

  expect(qsort(arr, undefined, (a, b) => b - a)).toEqual([4, 3, 2, 1]);
});

test('uses both swap callback and comparator to sort', () => {
  const arr = [3, 4, 2, 1];

  const swapMock = jest.fn();
  const comparatorMock = jest.fn((a, b) => a - b);

  expect(qsort(arr, swapMock, comparatorMock)).toEqual([1, 2, 3, 4]);
  expect(swapMock.mock.calls).toEqual([
    [0, 3], // → [1, 4, 2, 3]
    [1, 2], // → [1, 2, 4, 3]
    [2, 3], // → [1, 2, 3, 4]
  ]);
  expect(comparatorMock.mock.calls).toEqual([
    [1, 3],
    [4, 3],
    [2, 3],
    [2, 3],
    [4, 3],
    [2, 1],
  ]);
});

test('does not swap before the initial comparator call', () => {
  const arr = [3, 4, 2, 1];
  const comparatorMock = jest.fn(() => {
    throw new Error();
  });

  expect(() => qsort(arr, undefined, comparatorMock)).toThrow();

  expect(arr).toEqual([3, 4, 2, 1]); // No swaps
});

test('throw in comparator does not break sorting', () => {
  const arr = [3, 4, 2, 1];
  const swapMock = jest.fn();
  const comparatorMock = jest.fn();

  comparatorMock.mockImplementationOnce((a, b) => a - b);
  comparatorMock.mockImplementationOnce((a, b) => a - b);
  comparatorMock.mockImplementationOnce((a, b) => a - b);
  comparatorMock.mockImplementationOnce(() => {
    throw new Error();
  });

  expect(() => qsort(arr, swapMock, comparatorMock)).toThrow();

  expect(arr).toEqual([1, 2, 4, 3]);
  expect(swapMock.mock.calls).toEqual([
    [0, 3],
    [1, 2],
  ]);
  expect(comparatorMock.mock.calls).toEqual([
    [1, 3],
    [4, 3],
    [2, 3],
    [2, 3],
  ]);
});

test('sorts typed arrays', () => {
  const arr = Int32Array.of(3, 4, 2, 1);

  // Ensure valid type is inferred
  const arr2: Int32Array = qsort(arr, undefined, (a, b) => b - a);

  expect(arr2).toEqual(Int32Array.of(4, 3, 2, 1));
});

test('sorts arrays with undefined elements without comparator', () => {
  expect(qsort([undefined, 2, 1])).toEqual([1, 2, undefined]);
});

test('does not sort an array where all elements are equal according to a comparator', () => {
  const arr = [0, 1, 2, 3];
  const swapMock = jest.fn();

  expect(qsort(arr, swapMock, () => 0)).toEqual([0, 1, 2, 3]);
  expect(swapMock.mock.calls).toEqual([]);
});

test('sort an array where any element is less than another element', () => {
  expect(qsort([0, 1, 2, 3], undefined, () => -1)).toEqual([1, 2, 3, 0]);
});

test('sort an array where any element is greater than another element', () => {
  expect(qsort([0, 1, 2, 3], undefined, () => 1)).toEqual([0, 1, 2, 3]);
});
