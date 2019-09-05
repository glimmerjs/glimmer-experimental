
import { Helper as GlimmerHelper } from '@glimmer/interfaces';
import HelperReference, { UserHelper } from './reference';

export default function helper(helperFn: UserHelper): GlimmerHelper {
  return args => new HelperReference(helperFn, args);
}
