import Component from '@glimmer/component';
import { setComponentManager } from '@glimmerx/core';

import GlimmerComponentManager from './GlimmerComponentManager'

setComponentManager(Component, new GlimmerComponentManager());

export default Component;