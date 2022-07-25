import { expectTypeOf } from 'expect-type';
import { on, OnModifier } from '@glimmerx/modifier';

expectTypeOf(on).toEqualTypeOf<OnModifier>();
