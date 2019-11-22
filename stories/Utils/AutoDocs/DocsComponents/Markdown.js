import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Remarkable from 'react-remarkable';
import hljs from 'highlight.js';
import styled from 'styled-components';
import { Colors } from '@lawrence/ui-lib';
require('highlight.js/styles/ocean.css');
require('github-markdown-css/github-markdown.css');
require('./global.css');

export default class Markdown extends Component {
  static propTypes = {
    source: PropTypes.string,
    lang: PropTypes.string,
    watch: PropTypes.bool,
    path: PropTypes.string,
  };

  render() {
    const shouldHideForE2E = global.self === global.top;

    const customLang = this.props.lang;

    const options = {
      html: true,
      linkTarget: '_parent',
      highlight(code, lang) {
        return hljs.highlight(customLang ? customLang : lang, code).value;
      },
    };

    const MarkdownBody = styled.div`
      pre {
        background-color: ${Colors.grey_blue} !important;
        code {
          color: ${Colors.white};
        }
      }
    `;

    return !shouldHideForE2E ? (
      <MarkdownBody className="markdown-body">
        <Remarkable source={this.props.source} options={options} />
      </MarkdownBody>
    ) : null;
  }
}
