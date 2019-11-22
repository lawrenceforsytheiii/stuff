import React from 'react';
import * as Illustrations from '@lawrence/ui-lib/Illustrations';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';

const renderIcon = (name) => {
  const Container = styled(Box)`
    text-align: center;
    margin-bottom: 3em;

    .illustration {
      margin-bottom: 16px;
    }

    span {
      display: block;
      padding-bottom: 32px;
    }
  `;

  return (
    <Container key={name} width={[1 / 2, 1 / 3, 1 / 4]} px={2}>
      <div class='illustration'>{React.createElement(Illustrations[name])}</div>
      <span>{name}</span>
    </Container>
  );
};

export default () => <Flex flexWrap="wrap">{Object.keys(Illustrations).map(renderIcon)}</Flex>;
