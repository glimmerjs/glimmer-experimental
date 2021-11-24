import ClassModifierManager from './src/class-modifier-manager';
import ClassModifier from './src/class-modifier';
import { Owner } from '@glimmer/interfaces';
import FunctionalModifierManager from './src/functional-modifier-manager';
import FunctionalHelperManager from './src/functional-helper-manager';
import { setModifierManager, setHelperManager } from '@glimmer/core';

const CLASS_MODIFIER_MANAGER_FACTORY = (owner: Owner) => new ClassModifierManager(owner);
const FUNCTIONAL_MODIFIER_MANAGER = new FunctionalModifierManager();
const FUNCTIONAL_MODIFIER_MANAGER_FACTORY = () => FUNCTIONAL_MODIFIER_MANAGER;
const FUNCTIONAL_HELPER_MANAGER = new FunctionalHelperManager();
const FUNCTIONAL_HELPER_MANAGER_FACTORY = () => FUNCTIONAL_HELPER_MANAGER;

setModifierManager(CLASS_MODIFIER_MANAGER_FACTORY, ClassModifier);
setModifierManager(FUNCTIONAL_MODIFIER_MANAGER_FACTORY, Function.prototype);
setHelperManager(FUNCTIONAL_HELPER_MANAGER_FACTORY, Function.prototype);

export { default as Owner, FactoryIdentifier } from './src/owner';
export { default as renderComponent, RenderComponentOptions } from './src/renderComponent';
export { default as Modifier } from './src/class-modifier';

export {
  setComponentTemplate,
  componentCapabilities,
  ComponentCapabilities,
  ComponentDefinition,
  ComponentManager,
  setComponentManager,
  helperCapabilities,
  HelperManager,
  setHelperManager,
  modifierCapabilities,
  ModifierCapabilities,
  ModifierManager,
  setModifierManager,
  setOwner,
  getOwner,
  didRender,
} from '@glimmer/core';
