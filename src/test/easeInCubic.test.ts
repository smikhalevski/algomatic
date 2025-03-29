import { easeInCubic } from '../main';

test('easeInCubic', () => {
  expect(easeInCubic(0.5)).toBe(0.125);
});
