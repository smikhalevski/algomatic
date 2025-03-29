import { easeExp } from '../main';

test('easeExp', () => {
  expect(easeExp()(0.5)).toBe(0.3775406687981455);
});
