import Component from '@glimmer/component';
import { setComponentManager } from './component-managers';
import LiteComponentManager from './lite-component-manager';

setComponentManager(Component, new LiteComponentManager());

export default Component;