import React, { Fragment, Component } from 'react';
import { Colors, Elevations } from '@lawrence/ui-lib';
import { Flex, Box } from 'grid-styled';
import StoryContainer from '../../Utils/StoryContainer';
import { ColorsWrapper, Comment, DarkBgWrapper } from './ColorsStory.style';

export default class ColorsStory extends Component {
  renderColors(colors = []) {
    return colors.map((key) =>
      <Box key={key} width={[1 / 2, 1 / 3, 1 / 4, 1 / 6]} px={2}>
        <ColorsWrapper bg={Colors[key]}>
          <figure />
          <b>{key}</b>
          <code>{Colors[key]}</code>
        </ColorsWrapper>
      </Box>
    );
  };

  renderShadow(elevations = []) {
    return elevations.map(({name, desc}) =>
      <Box key={name} width={[1 / 2, 1 / 3, 1 / 4, 1 / 6]} px={2}>
        <ColorsWrapper elevation={Elevations[name]} bg={Colors.white}>
          <figure />
          <small>{desc}</small>
          <b>{name}</b>
          <code>{Elevations[name]}</code>
        </ColorsWrapper>
      </Box>
    );
  };

  render() {
    return (
      <Fragment>
        <StoryContainer>
          <h1>Accent</h1>
          <p>Brand colors</p>
          <Comment>Colors from @lawrence/ui-lib</Comment>
          <Flex flexWrap="wrap">
            {this.renderColors([
              'accent_1',
              'accent_2',
              'accent_3',
              'accent_4',
              'accent',
              'accent_dark'
            ])}
          </Flex>

          <h1>Neutral</h1>
          <p>Used for Text, Icons, Borders Containers, Hover (not active) on a light surface</p>
          <Comment>Colors from @lawrence/ui-lib</Comment>
          <Flex flexWrap="wrap">
            {this.renderColors([
              'background',
              'grey_blue_1',
              'grey_blue_2',
              'grey_blue_3',
              'grey_blue_4',
              'grey_blue_5',
              'grey_blue',
              'background_dark',
              'black'
            ])}
          </Flex>

          <h1>Neutral on dark</h1>
          <p>Used for Text, Icons, Borders Containers, Hover (not active) on a dark surface</p>
          <Comment>Colors from @lawrence/ui-lib</Comment>
          <DarkBgWrapper>
            <Flex flexWrap="wrap">
              {this.renderColors([
                'white',
                'white_1',
                'white_2',
                'white_3',
                'white_4',
                'white_5'
              ])}
            </Flex>
          </DarkBgWrapper>

          <h1>Semantic</h1>
          <p>Used for success, error, warning, information</p>
          <Comment>Colors from @lawrence/ui-lib</Comment>
          <Flex flexWrap="wrap">
            {this.renderColors([
              'error',
              'warning_light',
              'warning',
              'warning_dark',
              'success',
            ])}
          </Flex>

          <h1>Channels</h1>
          <p>Colours used for each channels</p>
          <Comment>Colors from @lawrence/ui-lib</Comment>
          <Flex flexWrap="wrap">
            {this.renderColors([
              'email',
              'sms',
              'web',
              'voice',
              'facebook',
              'whatsapp',
            ])}
          </Flex>

          <h1>Avatars</h1>
          <p>Colour used for the avatars of the contacts</p>
          <Comment>Colors from @lawrence/ui-lib</Comment>
          <Flex flexWrap="wrap">
            {this.renderColors([
              'avatar_orange',
              'avatar_red',
              'avatar_green',
              'avatar_yellow',
              'avatar_purple',
              'avatar_pink',
              'avatar_azure',
              'avatar_brown',
            ])}
          </Flex>

          <h1>Elevation</h1>
          <p>Used for the relative distance between two surfaces along the Z-axis</p>
          <Comment>Elevations from @lawrence/ui-lib</Comment>
          <Flex flexWrap="wrap">
            {this.renderShadow([
              {name: 'elevation_1', desc: 'Cards, containers & top bar'},
              {name: 'elevation_2', desc: 'Bottom app bar'},
              {name: 'elevation_3', desc: 'Select menu, Dropdowns'},
              {name: 'elevation_4', desc: 'Dialogs'},
            ])}
          </Flex>
        </StoryContainer>
      </Fragment>
    );
  }
}
