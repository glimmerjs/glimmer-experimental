import { expectTypeOf } from 'expect-type';
import { fn, FnHelper } from '@glimmerx/helper';

expectTypeOf(fn).toEqualTypeOf<FnHelper>();
