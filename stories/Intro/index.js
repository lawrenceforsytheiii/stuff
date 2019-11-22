import React from 'react';
import { storiesOf } from '@storybook/react';
import Markdown from '@lawrence/autodocs/Markdown';
import Readme from '../../README.md';
import StoryContainer from '../Utils/StoryContainer';

storiesOf('Introduction', module).add('Getting started', () => (
  <StoryContainer>
    <Markdown source={Readme} />
  </StoryContainer>
));
