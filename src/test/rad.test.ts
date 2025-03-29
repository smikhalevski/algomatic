import { rad } from '../main';

test('converts degrees to radians', () => {
  expect(rad(1)).toBeCloseTo(0.017);
  expect(rad(90)).toBe(Math.PI / 2);
});
