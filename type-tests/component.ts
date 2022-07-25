import { expectTypeOf } from 'expect-type';
import { hbs, TemplateComponent } from '@glimmerx/component';

declare module '@glimmerx/component' {
  // For the purposes of testing, make the instance type dependent on the `S` parameter,
  // even if in practice the variance wouldn't be quite right.
  export interface TemplateComponentInstance<S> {
    value: S;
  }
}

type SignatureOf<T> = T extends TemplateComponent<infer S> ? S : unknown;

interface GreetSignature {
  Args: { target: string };
}

export const InferredGreet: TemplateComponent<GreetSignature> = hbs`Hello, {{@target}}`;

export const ExplicitGreet = hbs<GreetSignature>`Hello, {{@target}}`;

expectTypeOf<SignatureOf<typeof ExplicitGreet>>().toEqualTypeOf<GreetSignature>();
