import { right } from '../main';

test('shifts right', () => {
  expect(right(0x11_22_22_44_55_66_77, 24)).toBe(0x11_22_22_44);
});

test('handles NaN as native operator', () => {
  expect(right(NaN, 8)).toBe(0);
  expect(right(0xab_cd, NaN)).toBe(0xab_cd);
});
