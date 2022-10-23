import { expect, it } from 'vitest';
import { getTipsFromFile } from '../getTipsFromFile';

it('Should work', () => {
  const fileContents = `
  interface Wow<T1> {}
  type Wow2<T1> = T1;
  `;

  const tips = getTipsFromFile(fileContents).map((tip) => tip.type);

  expect(tips).toEqual([
    'interface-declaration',
    'interface-or-type-with-generics',
    'interface-or-type-with-generics',
  ]);
});
