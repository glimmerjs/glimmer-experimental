import Component from '@glimmer/component';
import { setComponentManager, LiteComponentManager } from './component-managers';

setComponentManager(Component, new LiteComponentManager());

export default Component;