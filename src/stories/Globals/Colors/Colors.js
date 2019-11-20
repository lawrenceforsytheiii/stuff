import React from 'react';
import StyledRow from './ColorsStyles';

const renderColor = name => {
  return (
    <StyledRow key={name} bg={Colors[name]}>
      <figure />
      <span>{Colors[name]}</span>
      <b>{name}</b>
    </StyledRow>
  );
};

export default () => {
  return <div>{Object.keys(Colors).map(renderColor)}</div>;
};