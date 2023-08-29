import { binarySearch } from '../main';

describe('binarySearch', () => {
  test('searches for a value in an array', () => {
    expect(binarySearch([], 20)).toBe(-1);
    expect(binarySearch([10, 20, 30, 40], 20)).toBe(1);
    expect(binarySearch([10, 20, 30, 40], 25)).toBe(-3);
  });
});
