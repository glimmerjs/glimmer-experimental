export { default as Owner, FactoryIdentifier } from './src/owner';
export { default as renderComponent, RenderComponentOptions } from './src/renderComponent';

export {
  setComponentTemplate,
  componentCapabilities,
  ComponentCapabilities,
  ComponentDefinition,
  ComponentManager,
  setComponentManager,
  helperCapabilities,
  HelperCapabilities,
  HelperDefinition,
  HelperManager,
  setHelperManager,
  modifierCapabilities,
  ModifierCapabilities,
  ModifierDefinition,
  ModifierManager,
  setModifierManager,
  setOwner,
  getOwner,
  TemplateArgs,
  didRender,
} from '@glimmer/core';
