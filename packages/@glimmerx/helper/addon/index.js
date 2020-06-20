export { helper, Helper } from './-private/helper';

export function fn() {
  throw new Error(
    'Attempted to call {{fn}} directly. {{fn}} is built in in Ember, so it should automatically resolve. This function is for interop with Glimmer.js only.'
  );
}
