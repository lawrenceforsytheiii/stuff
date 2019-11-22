import React from 'react';
import { storiesOf } from '@storybook/react';
import Colors from './Colors/ColorsStory';
import Fonts from './Fonts';
import SvgIcons from './SvgIcons';
import SvgIllustrations from './SvgIllustrations';

storiesOf('Foundation', module)
  .add('Colors', () => <Colors />)
  .add('Fonts', () => <Fonts />)
  .add('SVG Icons', () => <SvgIcons />)
  .add('SVG Illustrations', () => <SvgIllustrations />);
