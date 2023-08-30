import { clamp } from '../main';

test('returns minimum', () => {
  expect(clamp(2, 4)(-1)).toBe(2);
});

test('returns maximum', () => {
  expect(clamp(2, 4)(100)).toBe(4);
});

test('returns value', () => {
  expect(clamp(2, 4)(3)).toBe(3);
});
