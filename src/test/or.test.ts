import { or } from '../main';

test('applies OR operator', () => {
  expect(or(0xab_cd_ef_ab_cd, 0x11_22_33_44_55)).toBe(0xbb_ef_ff_ef_dd);
});

test('handles NaN as native operator', () => {
  expect(or(NaN, 0xab_cd)).toBe(0xab_cd);
  expect(or(0xab_cd, NaN)).toBe(0xab_cd);
});
