import { copyOver } from '../main';

test('copies values', () => {
  expect(copyOver<any>([1, 2, 3], ['a', 'b', 'c', 'd'])).toEqual([1, 2, 3, 'd']);
});

test('copies values to target index', () => {
  expect(copyOver<any>([1, 2, 3], ['a', 'b', 'c', 'd'], 0, 2)).toEqual(['a', 'b', 1, 2, 3]);
});

test('copies values to target index with length', () => {
  expect(copyOver<any>([1, 2, 3], ['a', 'b', 'c', 'd'], 0, 2, 2)).toEqual(['a', 'b', 1, 2]);
});
