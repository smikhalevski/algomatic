import {parallelSort, swap} from '../main';

describe('parallelSort', () => {

  test('sorts parallel arrays', () => {
    const arr1 = [3, 4, 2, 1];
    const arr2 = ['c', 'd', 'b', 'a'];

    parallelSort(arr1, (i, j) => swap(arr2, i, j));

    expect(arr1).toEqual([1, 2, 3, 4]);
    expect(arr2).toEqual(['a', 'b', 'c', 'd']);
  });
});
