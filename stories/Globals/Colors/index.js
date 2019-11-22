import React from 'react';
import styled from 'styled-components';
import { Colors, Device } from '@lawrence/ui-lib';
import StoryContainer from '../../Utils/StoryContainer';
import CodeExample from '@lawrence/autodocs/CodeExample';
import { Flex, Box } from 'grid-styled';
import AllColors from './AllColors';
import AllColorsRaw from '!raw-loader!./AllColors';

export default class ColorsStory extends React.Component {
  renderColors() {
    const res = [];
    const ColorPreview = styled.div`
      text-align: center;
      margin-bottom: 3em;
      figure {
        width: 150px;
        height: 150px;
        background-color: ${props => props.bg};
        border-radius: 50%;
        display: inline-block;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 30px;
        margin: 0;

        @media ${Device.laptop} {
          width: 130px;
          height: 130px;
        }
      }
      b {
        display: block;
        padding: 0.8em;
      }
    `;
    Object.keys(Colors).forEach(key => {
      res.push(
        <Box key={key} width={[1 / 2, 1 / 3, 1 / 4, 1 / 6]} px={2}>
          <ColorPreview bg={Colors[key]}>
            <figure />
            <b>{key}</b>
            {Colors[key]}
          </ColorPreview>
        </Box>,
      );
    });

    return res;
  }

  render() {
    const Container = styled(Box)`
      margin-top: 2em;
    `;

    return (
      <div>
        <StoryContainer>
          <h1>Colors</h1>
          <p>This is a virtual presentation of the base colors.</p>
          <a
            className="style-guide"
            href="https://app.uxpin.com/design-system/180b99303af2c0d60592/colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Style Guide
          </a>
          <Container>
            <Flex flexWrap="wrap">{this.renderColors(Colors)}</Flex>
          </Container>
          <CodeExample title="All Colors" code={AllColorsRaw}>
            <AllColors />
          </CodeExample>
        </StoryContainer>
      </div>
    );
  }
}
