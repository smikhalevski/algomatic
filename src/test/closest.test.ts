import { closest } from '../main';

test('finds closest inside the range', () => {
  expect(closest([3, 0])(1.8)).toBe(3);
});

test('finds closest outside of the range', () => {
  expect(closest([1, 3, 0])(-100)).toBe(0);
});
