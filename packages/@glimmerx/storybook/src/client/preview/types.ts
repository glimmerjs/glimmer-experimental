import { ComponentDefinition, RenderComponentOptions } from '@glimmerx/core';

export type GlimmerStoryFnReturnType =
  | GlimmerStoryComponentClass
  | GlimmerStoryWithComponentRenderOptions;

export type GlimmerStoryComponentClass = ComponentDefinition;

export interface GlimmerStoryWithComponentRenderOptions {
  componentClass: GlimmerStoryComponentClass;
  renderOptions: RenderComponentOptions;
}

export interface IStorybookStory {
  name: string;
  render: () => any;
}

export interface IStorybookSection {
  kind: string;
  stories: IStorybookStory[];
}

export interface ShowErrorArgs {
  title: string;
  description: string;
}

export interface RenderMainArgs {
  storyFn: () => GlimmerStoryFnReturnType;
  selectedKind: string;
  selectedStory: string;
  showMain: () => void;
  showError: (args: ShowErrorArgs) => void;
  forceRender: boolean;
}
