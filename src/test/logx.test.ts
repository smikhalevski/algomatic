import { logx } from '../main';

test('returns Infinity', () => {
  expect(logx(0, 10)).toBe(-Infinity);
});

test('returns log of fractional value', () => {
  expect(logx(0.1, 10)).toBe(-1);
  expect(logx(0.01, 10)).toBe(-2);
  expect(logx(10 ** -6, 10)).toBe(-6);
});

test('returns log of positive integer value', () => {
  expect(logx(1, 10)).toBe(0);
  expect(logx(11, 10)).toBeCloseTo(1.04);
  expect(logx(333, 10)).toBeCloseTo(2.52);
  expect(logx(10 ** 6, 10)).toBe(6);
});

test('returns NaN for negative values', () => {
  expect(logx(-1, 10)).toBe(NaN);
});

test('returns log of a very large number', () => {
  expect(logx(562_949_953_421_311, 10)).toBeCloseTo(14.75);
});
