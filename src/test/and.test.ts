import { and } from '../main';

test('applies AND operator', () => {
  expect(and(0xab_cd_ef_ab_cd, 0x11_22_33_44_55)).toBe(0x1_00_23_00_45);
});

test('handles NaN as native operator', () => {
  expect(and(NaN, 0xab_cd)).toBe(0);
  expect(and(0xab_cd, NaN)).toBe(0);
});
