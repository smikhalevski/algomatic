import { right } from '../main';

test('shifts right', () => {
  expect(right(0xab_cd_ef_ab_cd_ef_ab, 24)).toBe(0xab_cd_ef_ab);
});

test('handles NaN as native operator', () => {
  expect(right(NaN, 8)).toBe(0);
  expect(right(0xab_cd, NaN)).toBe(0xab_cd);
});
