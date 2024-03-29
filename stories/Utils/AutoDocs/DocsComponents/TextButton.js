import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Colors } from '@lawrence/ui-lib';

export default class TextButton extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
    };

    this.toggleHover = this.toggleHover.bind(this);
  }

  toggleHover() {
    this.setState({
      isHover: !this.state.isHover,
    });
  }

  render() {
    const buttonColor = this.state.isHover ? Colors.accent : Colors.accent_dark;

    const style = {
      color: buttonColor,
      outline: 'none',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
    };

    return (
      <button
        style={style}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}
