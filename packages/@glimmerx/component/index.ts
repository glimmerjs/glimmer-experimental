export { default } from '@glimmer/component';
export { tracked } from '@glimmer/tracking';

// This type exists to provide a non-user-constructible, non-subclassable
// type representing the conceptual "instance type" of a template-only component.
// The abstract field of type `never` presents subclassing in userspace of
// the value returned from `hbs`.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export declare abstract class TemplateComponentInstance<S> {
  protected abstract __concrete__: never;
}

// By making `TemplateComponent` abstract and impossible to subclass
// (see above), we prevent users from attempting to instantiate a the
// return value of `hbs` themselves, while leaving a hook for tools
// like Glint to augment the type.
export type TemplateComponent<S> = abstract new () => TemplateComponentInstance<S>;

export function hbs<S>(_strings: TemplateStringsArray): TemplateComponent<S> {
  throw new Error('hbs template should have been compiled at build time');
}
