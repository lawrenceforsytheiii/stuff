import styled from 'styled-components';
import { Colors, Fonts } from '@lawrence/ui-lib';

export default styled.div`
  font-family: ${`${Fonts.fontFamily  },${  Fonts.fallbackFontFamily}`};
  padding: 40px 24px;

  h1 {
    font-weight: normal;
    margin-top: 0;
  }

  .style-guide {
    color: ${Colors.accent};
    text-decoration: none;
    &:visited,
    &:hover,
    &:focus,
    &:active {
      color: ${Colors.accent};
    }
  }

  code {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    background-color: ${Colors.background};
    border-radius: 3px;
  }

   h2 {
    padding-bottom: 0.3em;
    font-size: 1.5em;
    border-bottom: 1px solid ${Colors.accent_2};
    display: block;
  }

  p {
    margin-top: 0;
  }
`;
