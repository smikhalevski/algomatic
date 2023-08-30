import { lerp } from '../main';

test('creates a linear interpolator', () => {
  const fn = lerp([0, 1, 2], [0, 1, 0]);

  expect(fn(0)).toBe(0);
  expect(fn(0.5)).toBe(0.5);
  expect(fn(1)).toBe(1);
  expect(fn(1.5)).toBe(0.5);
  expect(fn(2)).toBe(0);
});
