import React, { Fragment } from 'react';
import { Fonts, Colors } from '@lawrence/ui-lib';
import styled from 'styled-components';

const renderFontFamily = (weighting) => {
  const StyledRow = styled.div`
    padding: 0.8em;
    background-color: ${Colors.background};
    margin-bottom: 1em;

    h4 {
      margin: 0;
      font-weight: normal;
    }
  `;

  const SampleText = styled.span`
    font-weight: ${(props) => props.weight};
    font-style: ${(props) => props.styl};
  `;

  return Object.keys(Fonts.styles).map((style) => (
    <StyledRow key={weighting + style}>
      <h4>
        <b>Weight</b>: {weighting} <b>Style</b>: {style}
      </h4>
      <SampleText weight={Fonts.weights[weighting]} styl={style}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum,
        ratione.
      </SampleText>
    </StyledRow>
  ));
};

export default () => (
  <Fragment>
    <p>
      The following sample text is using 1rem <code>{Fonts.fontFamily}</code>.
      Fallback font family is <code>{Fonts.fallbackFontFamily}</code>.
    </p>
    {Object.keys(Fonts.weights).map(renderFontFamily)}
  </Fragment>
);
