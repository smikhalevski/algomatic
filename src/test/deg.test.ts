import { deg } from '../main';

test('converts radians to degrees', () => {
  expect(deg(Math.PI)).toBe(180);
  expect(deg(Math.PI / 2)).toBe(90);
});
