# Storybook for GlimmerJs

---

Storybook for GlimmerJs is a UI development environment for your GlimmerJS App.
With it, you can visualize different states of your UI components and develop them interactively.

![Storybook Screenshot](https://github.com/storybookjs/storybook/blob/master/media/storybook-intro.gif)

Storybook runs outside of your app.
So you can develop UI components in isolation without worrying about app specific dependencies and requirements.

## Getting Started

### Automatic setup (tbd)

### Manual setup
If you want to set up Storybook manually for your Glimmerjs project, this is the guide for you.

#### Step 1: Add dependencies
##### Add @glimmerx/storybook
Add glimmerx/storybook to your project. To do that, run:
```
yarn add @glimmerx/storybook --save-dev
```

##### Add peer dependencies
If these are not already present in the host glimmer app include @glimmerx/core, @glimmerx/component packages in your dependencies as well.

```
yarn add @glimmerx/core @glimmerx/component
```

#### Step 2: Add an npm script
Then add the following NPM scripts to your package.json in order to start or build the storybook app.

```
{
    "scripts": {
        "storybook": "start-storybook",
        "build-storybook": "build-storybook"
    }
}
```

#### Step 3: Create the config file
For a basic Storybook configuration, the only thing you need to do is tell Storybook where to find stories.

To do that, create a file at .storybook/config.js with the following content:
```js
import { configure } from '@glimmerx/storybook';

const useSubdirectories = true

configure(require.context('../src', useSubdirectories, /\.stories\.js$/), module);
```
That will load all the stories underneath your ../src directory that match the pattern *.stories.js. We recommend co-locating your stories with your source files, but you can place them wherever you choose.

#### Step 4: Write your stories
Now create a ../stories/index.js file, and write your first story like this:

```js
import { storiesOf } from '@glimmerx/storybook';
import SampleComponent from '../src/SampleComponent';

class OtherComponent extends Component {
  static template = hbs`<SampleComponent />`;
}

storiesOf('Sample', module).add('OtherComponent', () => OtherComponent );
```
Each story is a single state of your component. In the above case, there is a story using the SampleComponent.

#### Finally: Run your Storybook
Now everything is ready. Run your storybook with:
```
yarn run storybook
```
Storybook should start, on a random open port in dev-mode.

Now you can develop your components and write stories and see the changes in Storybook immediately since it uses Webpack’s hot module reloading.

For more information visit: [storybook.js.org](https://storybook.js.org)

---

Storybook also comes with a lot of [addons](https://storybook.js.org/addons/introduction) and a great API to customize as you wish.
You can also build a [static version](https://storybook.js.org/basics/exporting-storybook) of your storybook and deploy it anywhere you want.
