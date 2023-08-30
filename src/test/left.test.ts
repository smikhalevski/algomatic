import { left } from '../main';

test('shifts left', () => {
  expect(left(0xab_cd_ef_ab_cd, 24)).toBe(0xab_cd_ef_ab_cd_00_00_00);
});

test('handles NaN as native operator', () => {
  expect(left(NaN, 8)).toBe(0);
  expect(left(0xab_cd, NaN)).toBe(0xab_cd);
});
