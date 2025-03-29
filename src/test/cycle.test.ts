import { cycle } from '../main';

test('returns boundary values', () => {
  expect(cycle(0, 10)(0)).toBe(0);
  expect(cycle(0, 10)(10)).toBe(10);
});

test('brings number to range', () => {
  expect(cycle(0, 10)(11)).toBe(1);
  expect(cycle(0, 100)(150)).toBe(50);
  expect(cycle()(123.5)).toBe(0.5);
  expect(cycle(0, 100)(-50)).toBe(50);
  expect(cycle(0, -1)(0.222)).toBe(-0.778);
  expect(cycle(33, 100)(333)).toBe(65);
  expect(cycle(33, 100)(-333)).toBe(69);
});
