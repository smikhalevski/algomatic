import { and } from '../main';

test('applies AND operator', () => {
  expect(and(0xab_cd_ef_ab_cd, 0x11_22_33_44_55)).toBe(0x1_00_23_00_45);
  expect(and(0x10_aa_bb_00_00_00_ff, 0x10_00_bb_cc_00_00_ff)).toBe(0x10_00_bb_00_00_00_ff);
});

test('handles NaN as native operator', () => {
  expect(and(NaN, 0xab_cd)).toBe(0);
  expect(and(0xab_cd, NaN)).toBe(0);
});
