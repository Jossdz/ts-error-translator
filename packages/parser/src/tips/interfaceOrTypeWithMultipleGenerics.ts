import * as t from '@babel/types';
import { z } from 'zod';
import { createTip } from '../createTip';
import { safeParse, SourceLocationSchema } from '../utils';

const Schema = z.object({
  loc: SourceLocationSchema,
  typeParameters: z.object({
    type: z.literal('TSTypeParameterDeclaration'),
    params: z
      .array(
        z.object({
          type: z.literal('TSTypeParameter'),
        }),
      )
      .min(2),
  }),
});

export const interfaceOrTypeWithMultipleGenerics = createTip<{
  type: 'interface-or-type-with-multiple-generics';
  loc: t.SourceLocation;
}>((push) => {
  return {
    TSInterfaceDeclaration(path) {
      safeParse(() => {
        const node = Schema.parse(path.node);
        push({
          type: 'interface-or-type-with-multiple-generics',
          loc: node.loc,
        });
      });
    },
    TSTypeAliasDeclaration(path) {
      safeParse(() => {
        const node = Schema.parse(path.node);
        push({
          type: 'interface-or-type-with-multiple-generics',
          loc: node.loc,
        });
      });
    },
  };
});
