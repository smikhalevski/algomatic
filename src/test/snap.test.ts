import { snap } from '../main';

test('rounds to a step', () => {
  expect(snap(3)(-10)).toBe(-9);
  expect(snap(3)(-11)).toBe(-12);
  expect(snap(3)(10)).toBe(9);
  expect(snap(3)(11)).toBe(12);
});
