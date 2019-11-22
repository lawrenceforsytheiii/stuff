import React, { Fragment } from 'react';
import * as Icons from '@lawrence/ui-lib/Icons';
import { Colors } from '@lawrence/ui-lib';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import CodeBlock from '@lawrence/autodocs/CodeBlock';

const renderIcon = (name) => {
  const Container = styled(Box)`
    padding-bottom: 0.5em;
    i {
      color: ${Colors.grey_blue_5};
      float: left;
    }
    span {
      padding-left: 5px;
    }
  `;

  return (
    <Container key={name} width={[1 / 2, 1 / 3, 1 / 4]} px={2}>
      <i>{React.createElement(Icons[name])}</i>
      <span>{name}</span>
    </Container>
  );
};

export default () => {
  const importSyntax = 'import { Youtube, Web } from \'@lawrence/ui-lib/Icons\';';
  return (
    <Fragment>
      <Flex flexWrap="wrap">{Object.keys(Icons).map(renderIcon)}</Flex>
      <Box pt={3}>
        <CodeBlock source={importSyntax} type="javascript" />
        <Icons.Youtube />
        <Icons.Web />
      </Box>
    </Fragment>
  );
};
