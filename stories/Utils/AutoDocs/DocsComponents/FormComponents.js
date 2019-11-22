import React from 'react';
import PropTypes from 'prop-types';

import {
  Switch,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField
} from '@material-ui/core';
import { Colors } from '@lawrence/ui-lib';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import Markdown from './Markdown';
import CodeBlock from './CodeBlock';

const styles = {};

const Container = styled(Box)`
  margin-top: 2em;

  h2 {
    font-weight: normal;
    margin: 0;
    margin-bottom: 0.8em;
    display: block;
    width: 100%;
    position: relative;
    > div {
      margin-left: 1.1em;
      margin-top: 0.5em;
      display: inline-block;
    }
  }
`;

const Wrapper = ({ children }) => (
  <Container>
    <Flex flexWrap="wrap">{children}</Flex>
  </Container>
);

Wrapper.propTypes = {
  children: PropTypes.node,
};

const OptionsContainer = styled.div`
  margin-bottom: 2em;
  .option-row {
    overflow: hidden;
    .markdown-body {
      padding: 0.8em 0.2em;
      p {
        margin-bottom: 0;
      }
    }

    .field-cell {
      input {
        margin-top: 0.6em;
      }
    }
  }
  .option-row:nth-child(2n + 1) {
    background-color: ${Colors.background};
  }
`;

const Options = ({ children }) => (
  <Box width={[1, 1 / 2]} pr={30}>
    <div className={styles.title}>
      <h2>Props</h2>
    </div>
    <OptionsContainer>{children}</OptionsContainer>
  </Box>
);

Options.propTypes = {
  children: PropTypes.node,
};

const Option = ({ label, value, children, onChange }) => {
  return children ? (
    <Flex flexWrap="wrap" className="option-row" my={2}>
      <Box width={[1 / 3]} pr={15}>
        <Markdown source={`\`${label}\``} />
      </Box>

      <Box width={[2 / 3]} className="field-cell">
        {React.cloneElement(
          children,
          new Set(['onClick', 'onCancel', 'onSubmit']).has(label) ? {} : { value, onChange },
        )}
      </Box>
    </Flex>
  ) : null;
};

Option.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  children: PropTypes.node,
  onChange: PropTypes.func,
};

function checkerboard(size, bgsize, color1, color2) {
  return `
    background: linear-gradient(
      45deg,
      ${color1} 25%,
      transparent 25%,
      transparent 75%,
      ${color1} 75%,
      ${color1} 0
    ),
    linear-gradient(
      45deg,
      ${color1} 25%,
      transparent 5%,
      transparent 75%,
      ${color1} 75%,
      ${color1} 0
    ),
    ${color2};
  background-position: 0 0, ${bgsize} ${bgsize};
  background-size: ${size} ${size};
  background-clip: border-box;
  background-origin: padding-box;
  `;
}

const Preview = ({
  children,
  isDarkBackground,
  previewBackground,
  noPreview,
  wider,
  theme,
}) => {
  const PreviewPane = styled.div`
    padding: 60px 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid ${Colors.grey_blue_2};
    box-shadow: 0 0 10px 2px
      ${(theme === 'dark' &&
        (isDarkBackground || previewBackground) &&
        Colors.grey_blue) ||
        (theme === 'light' && isDarkBackground && Colors.grey_blue) ||
        (theme === 'light' &&
          (!isDarkBackground || previewBackground) &&
          Colors.grey_blue_1) ||
        Colors.grey_blue_2}
      inset;
    ${previewBackground === Colors.grey_blue_1 ? checkerboard('20px','10px', Colors.grey_blue_1, Colors.white) : `background-color: ${ previewBackground || Colors.white }`};
  `;
  return (
    <Box width={wider ? [1] : [1, 1 / 2]} pb={20}>
      {noPreview ? null : (
        <div>
          <div>
            <h2>
              Preview
            </h2>
          </div>

          <PreviewPane>{children}</PreviewPane>
        </div>
      )}
    </Box>
  );
};

Preview.propTypes = {
  children: PropTypes.node,
  isRtl: PropTypes.bool,
  isDarkBackground: PropTypes.bool,
  onToggleRtl: PropTypes.func,
  onToggleBackground: PropTypes.func,
};

const ToggleContainer = styled.div`
  width: 60px;
  display: inline-block;
`;

const CustomToggle = ({ value, onChange, ...props }) => (
  <ToggleContainer>
    <Switch
      color="primary"
      checked={value}
      onChange={(e, checked) => onChange(checked)}
    />
  </ToggleContainer>
);

CustomToggle.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func,
};

const List = ({ value, values = [], onChange, ...props }) => {
  return values.length > 3 ? (
    <SelectContainer>
      <Select value={value} onChange={event => onChange(event.target.value)}>
        {values.map((v, i) => (
          <MenuItem key={i} value={v}>
            {v}
          </MenuItem>
        ))}
      </Select>
    </SelectContainer>
  ) : (
    <RadioGroup
      name={value}
      value={value.toString()}
      onChange={event => onChange(event.target.value)}
    >
      {values.map((value, i) => (
        <FormControlLabel
          value={value.toString()}
          key={i}
          control={<Radio color="primary" />}
          label={value}
        />
      ))}
    </RadioGroup>
  );
};

List.propTypes = {
  value: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
};

const RadioButtonGroupContainer = styled.div`
  padding: 0.8em 0;

  i {
    display: inline-block;
    float: left;
  }
`;
const SelectContainer = styled.div`
  padding-top: 0.6em;
`;

const radioButtonStyles = {
  radioButton: {
    marginBottom: 6,
  },
};

const objectTextAreaStyles = {
  background: 'none',
  width: '100%',
  border: 'none',
  overflow: 'hidden',
  resize: 'none',
};

class NodesList extends React.Component {
  view = e => {
    if (typeof e === 'function') {
      return React.createElement(e);
    }
    if (Object.prototype.toString.call(e) === '[object Array]') {
      return React.createElement(() => (
        <textarea
          style={objectTextAreaStyles}
          value={JSON.stringify(e)}
          readOnly
        />
      ));
    }
    return e;
  };
  getChangedValue = e => {
    if (typeof e === 'function') {
      return React.createElement(e);
    }
    return e;
  };

  render() {
    const { values = [], onChange } = this.props;

    return values.length > 3 ? (
      <SelectContainer>
        <Select
          name={values.length.toString()}
          value={this.state && this.state.selected ? this.state.selected : 0}
          onChange={event => {
            this.setState({ selected: event.target.value });
            onChange(this.view(values[event.target.value]));
          }}
          style={{ width: '90%' }}
        >
          {values.map((value, i) => (
            <MenuItem key={i} value={i}>
              {this.view(value)}
            </MenuItem>
          ))}
        </Select>
      </SelectContainer>
    ) : (
      <RadioButtonGroupContainer>
        <RadioGroup
          name={values.length.toString()}
          value={this.state && this.state.selected ? this.state.selected : '0'}
          onChange={(e, v) => {
            this.setState({ selected: v });
            onChange(this.getChangedValue(values[v]));
          }}
        >
          {values.map((value, i) => (
            <FormControlLabel
              value={i.toString()}
              key={i}
              control={<Radio color="primary" />}
              label={this.view(value)}
              style={radioButtonStyles.radioButton}
            />
          ))}
        </RadioGroup>
      </RadioButtonGroupContainer>
    );
  }
}

NodesList.propTypes = {
  value: PropTypes.any,
  values: PropTypes.arrayOf(PropTypes.any),
  onChange: PropTypes.func,
};

const Input = ({ value, onChange, ...props }) => (
  <TextField
    name={value ? value.toString() : 'init'}
    defaultValue={value || ''}
    style={{ width: '90%' }}
    onChange={event => onChange(event.target.value)}
  />
);

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
};

const Code = ({ source }) => (
  <Box width={1}>
    <div>
      <h2>Code</h2>
    </div>

    <CodeBlock source={source} lang={'html'} />
  </Box>
);

Code.propTypes = {
  source: PropTypes.string,
};

export {
  Wrapper,
  Options,
  Option,
  Preview,
  CustomToggle,
  Input,
  List,
  Code,
  NodesList,
};

export {};
