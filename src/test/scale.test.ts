import { scale } from '../main';

test('scales value from one range to another', () => {
  expect(scale(0, 100, 1, 3)(2)).toBe(50);
});

test('scales value between inverse ranges', () => {
  expect(scale(0, 100, -100, 0)(-75)).toBe(25);
});

test('scales value outside of initial range', () => {
  expect(scale(-100, 100, 1, 2)(4)).toBe(500);
});
