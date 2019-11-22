import React, { Fragment } from 'react';
import { Fonts, Colors } from '@lawrence/ui-lib';
import styled from 'styled-components';

const renderFontSizes = (name) => {
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
    font-size: ${(props:Props) => props.size};
  `;

  return (
    <StyledRow key={name}>
      <h4>
        <b>{name}</b>: {Fonts.sizes[name]}
      </h4>
      <SampleText size={Fonts.sizes[name]}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum,
        ratione.
      </SampleText>
    </StyledRow>
  );
};

export default () => (
  <Fragment>
    <p>
      All font sizes are based on rem. 1rem equals 16px. The following sample
      text is using regular <code>{Fonts.fontFamily}</code>.
    </p>
    {Object.keys(Fonts.sizes).map(renderFontSizes)}
  </Fragment>
);
