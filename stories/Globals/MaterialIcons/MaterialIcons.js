import React from 'react';
import MaterialIconNames from './MaterialIconNames';
import { Flex, Box } from 'grid-styled';
import { Link } from '@lawrence/ui-lib';
import styled from 'styled-components';

const renderIcon = name => {
  const Container = styled(Box)`
    padding-bottom: 0.5em;
    i {
      color: #333;
      float: left;
    }
    span {
      padding-left: 5px;
    }
  `;

  return (
    <Container key={name} width={[1 / 2, 1 / 3, 1 / 4]} px={2}>
      <i className="material-icons">{name}</i>
      <span>{name}</span>
    </Container>
  );
};

export default () => {
  return (
    <div>
      <p>
        These icons are using
        <Link href="https://material.io/icons/" external primary>
          Google Material Icons Font
        </Link>. This icon font has been included in global css.
      </p>
      <Flex flexWrap="wrap">{MaterialIconNames.slice(0, 100).map(renderIcon)}</Flex>
    </div>
  );
};
