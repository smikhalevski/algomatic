import {parallelSort, swap} from '../main';

describe('parallelSort', () => {

  test('sorts an array of 2', () => {
    const arr = [1, 0];
    const swapMock = jest.fn();

    parallelSort(arr, swapMock);

    expect(arr).toEqual([0, 1]);
    expect(swapMock).toHaveBeenCalledTimes(1);
    expect(swapMock).toHaveBeenCalledWith(0, 1);
  });

  test('sorts an array of 3', () => {
    const arr = [2, 0, 1];

    parallelSort(arr, () => undefined);

    expect(arr).toEqual([0, 1, 2]);
  });

  test('sorts parallel arrays', () => {
    const arr1 = [3, 4, 2, 1];
    const arr2 = ['c', 'd', 'b', 'a'];

    parallelSort(arr1, (i, j) => swap(arr2, i, j));

    expect(arr1).toEqual([1, 2, 3, 4]);
    expect(arr2).toEqual(['a', 'b', 'c', 'd']);
  });
});
