import { xor } from '../main';

test('applies XOR operator', () => {
  expect(xor(0x10_00_00_00_00, 0x10_10_10_10_10)).toBe(0x10_10_10_10);
});

test('handles NaN as native operator', () => {
  expect(xor(NaN, 0xab_cd)).toBe(0xab_cd);
  expect(xor(0xab_cd, NaN)).toBe(0xab_cd);
});
