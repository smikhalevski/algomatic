import {copyOver} from '../../main';

describe('copyOver', () => {

  it('copies values', () => {
    expect(copyOver<unknown[]>([1, 2, 3], ['a', 'b', 'c', 'd'])).toEqual([1, 2, 3, 'd']);
  });

  it('copies values to target index', () => {
    expect(copyOver<unknown[]>([1, 2, 3], ['a', 'b', 'c', 'd'], 0, 2)).toEqual(['a', 'b', 1, 2, 3]);
  });

  it('copies values to target index with length', () => {
    expect(copyOver<unknown[]>([1, 2, 3], ['a', 'b', 'c', 'd'], 0, 2, 2)).toEqual(['a', 'b', 1, 2]);
  });

  it('copies values to target index with length and source index', () => {
    expect(copyOver<unknown[]>([1, 2, 3], ['a', 'b', 'c', 'd'], 2, 2, 2)).toEqual(['a', 'b', 3, 'd']);
  });
});
