export { action } from '@ember/object';

export function on() {
  throw new Error(
    'Attempted to call {{on}} directly. {{on}} is built in in Ember, so it should automatically resolve. This function is for interop with Glimmer.js only.'
  );
}
