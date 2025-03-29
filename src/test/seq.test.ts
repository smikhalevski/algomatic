import { seq } from '../main';

test('creates a new array', () => {
  expect(seq(0)).toEqual([]);
  expect(seq(1)).toEqual([0]);
  expect(seq(5)).toEqual([0, 0.25, 0.5, 0.75, 1]);
  expect(seq(5, -10, 10)).toEqual([-10, -5, 0, 5, 10]);
});
