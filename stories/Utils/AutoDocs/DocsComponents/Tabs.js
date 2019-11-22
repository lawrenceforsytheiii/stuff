import React from 'react';
import PropTypes from 'prop-types';

import { Colors } from '@lawrence/ui-lib';

import styled from 'styled-components';

class Tabs extends React.Component {
  render() {
    const { items, onClick, activeId } = this.props;
    const Container = styled.div`
      display: flex;
      max-width: 100%;
      border-bottom: 2px solid ${Colors.accent_4};

      &.hasDivider {
        border-color: $D60;
      }
    `;
    const TabContainer = styled.ul`
      min-width: 628px;
      display: flex;
      flex-grow: 1;
      flex-shrink: 1;
      margin: 0;
      padding: 0;
      list-style: none;
    `;
    const Tab = styled.li`
      position: relative;
      padding: 13px 18px;
      margin: 0 0 -1px;
      //border-bottom: ${props =>
        `3px solid ${props.active ? Colors.accent_4 : 'transparent'}`};
      white-space: nowrap;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      background-color: ${props =>
        props.active ? Colors.accent_4 : 'transparent'};
      color: ${props => (props.active ? Colors.white : Colors.black)};

      &:hover {
        color: ${props => (props.active ? Colors.white : Colors.accent_4)};
      }
    `;
    return (
      <Container>
        <TabContainer>
          {items.map(item => (
            <Tab
              key={item.id}
              onClick={() => onClick(item)}
              active={activeId === item.id}
            >
              <span>{item.title}</span>
            </Tab>
          ))}
        </TabContainer>
      </Container>
    );
  }
}

const stringOrNumber = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);

const item = PropTypes.shape({
  id: stringOrNumber,
  title: PropTypes.node,
  dataHook: PropTypes.string,
});

Tabs.propTypes = {
  items: PropTypes.arrayOf(item).isRequired,
  onClick: PropTypes.func,
  activeId: stringOrNumber,
};

export default Tabs;
