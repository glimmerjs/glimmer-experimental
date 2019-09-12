import { TagWrapper, RevisionTag, Reference, combine } from '@glimmer/reference';
import { CachedReference } from '@glimmer/component';
import { Dict, VMArguments, CapturedArguments } from '@glimmer/interfaces';

export type HelperOptions = {
  services?: Dict<unknown>
};

export type UserHelper = (args: ReadonlyArray<unknown>, named: Dict<unknown>, options: HelperOptions) => any;

export default class HelperReference extends CachedReference<unknown> {
  public tag: TagWrapper<RevisionTag | null>;
  private args: CapturedArguments;
  private servicesRef?: Reference<Dict<unknown>>;

  constructor(private helper: UserHelper, args: VMArguments, servicesRef?: Reference<Dict<unknown>>) {
    super();
    if (servicesRef) {
      this.tag = combine([args.tag, servicesRef.tag]);
    } else {
      this.tag = args.tag;
    }

    this.args = args.capture();
    this.servicesRef = servicesRef;
  }

  compute() {
    let { helper, args } = this;
    let options: HelperOptions = {};

    if (this.servicesRef) {
      options.services = this.servicesRef.value();
    }

    return helper(args.positional.value(), args.named.value(), options);
  }
}
