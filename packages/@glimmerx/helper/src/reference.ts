import { TagWrapper, RevisionTag } from '@glimmer/reference';
import { CachedReference } from '@glimmer/component';
import { Dict, VMArguments, CapturedArguments } from '@glimmer/interfaces';

export type UserHelper = (args: ReadonlyArray<unknown>, named: Dict<unknown>) => any;

export default class HelperReference extends CachedReference<unknown> {
  public tag: TagWrapper<RevisionTag | null>;
  private args: CapturedArguments;

  constructor(private helper: UserHelper, args: VMArguments) {
    super();
    this.tag = args.tag;
    this.args = args.capture();
  }

  compute() {
    let { helper, args } = this;

    return helper(args.positional.value(), args.named.value());
  }
}
