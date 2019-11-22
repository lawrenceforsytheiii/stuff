import { configure, addDecorator  } from "@storybook/react";
import { setOptions } from "@storybook/addon-options";
import StoryRouter from 'storybook-react-router';

addDecorator(StoryRouter());

function loadStories() {
  require('./stories');
}

configure(loadStories, module);

setOptions({
  showDownPanel: false,
  name: "ui-lib",
  // url: "https://bitbucket.org/lawrence/ui-lib",
  sidebarAnimations: true
});
