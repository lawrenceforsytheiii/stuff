import React from 'react';
import StoryContainer from '../../Utils/StoryContainer';
import CodeExample from '@lawrence/autodocs/CodeExample';
import MaterialIcons from './MaterialIcons';
import MaterialIconsRaw from '!raw-loader!./MaterialIcons';

export default class MaterialIconsStory extends React.Component {
  render() {
    return (
      <div>
        <StoryContainer>
          <h1>Material Icons</h1>
          <p>This is a virtual presentation of the icons.</p>
          <a
            className="style-guide"
            href="https://preview.uxpin.com/styleguide/d8e56ce1b15096500c187672338c745d5f7cad31#/typography-guide"
            target="_blank"
            rel="noopener noreferrer"
          >
            Style Guide
          </a>
          <CodeExample title="Material Icons" code={MaterialIconsRaw}>
            <MaterialIcons />
          </CodeExample>
        </StoryContainer>
      </div>
    );
  }
}
