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
  HelperManager,
  setHelperManager,
  modifierCapabilities,
  ModifierCapabilities,
  ModifierManager,
  setModifierManager,
  setOwner,
  getOwner,
  TemplateArgs,
  didRender,
} from '@glimmer/core';
