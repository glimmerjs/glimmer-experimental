import { expectTypeOf } from 'expect-type';
import { helper, Helper, fn, FnHelper } from '@glimmerx/helper';

declare module '@glimmerx/helper/dist/commonjs/src/helper' {
  // For the purposes of testing, make the instance type dependent on the `S` parameter,
  // even if in practice the variance wouldn't be quite right.
  export interface HelperInstance<S> {
    signature: S;
  }
}

type SignatureOf<T> = T extends Helper<infer S> ? S : unknown;

expectTypeOf(fn).toEqualTypeOf<FnHelper>();

const myHelper = helper((_: [], { arg }: { arg: string }) => arg);

expectTypeOf<SignatureOf<typeof myHelper>>().toEqualTypeOf<{
  Args: {
    Positional: [];
    Named: { arg: string };
  };
  Return: string;
}>();
