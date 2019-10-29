export { default as renderComponent, RenderComponentOptions, didRender, dictToReference } from './src/renderComponent';

export { Constructor } from './src/interfaces';

export { default as RuntimeResolver } from './src/renderComponent/RuntimeResolver';
export { default as CompileTimeResolver } from './src/renderComponent/CompileTimeResolver';

export { definitionForComponent } from './src/renderComponent/definitions';

export { getComponentManager, setComponentManager } from './src/setComponentManager';
export { getComponentTemplate, setComponentTemplate } from './src/setComponentTemplate';