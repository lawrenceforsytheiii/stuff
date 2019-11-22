import React, { Component } from 'react';
import PropTypes from 'prop-types';

import reactElementToJSXString from 'react-element-to-jsx-string';
import { ThemeProvider } from 'styled-components';

import {
  Wrapper,
  Options,
  Option,
  Preview,
  Code,
  CustomToggle,
  Input,
  List,
  NodesList,
} from './DocsComponents/FormComponents';

const stripQuotes = string => {
  const quoted = string.match(/^['"](.*?)['"]$/);
  return quoted ? quoted[1] : string;
};

/**
 * Create a playground for some component, which is suitable for storybook. Given raw `source`, component reference
 * and, optionally, `componentProps`,`AutoExample` will render:
 *
 * * list of all available props with toggles or input fields to control them (with `defaultProps` values applied)
 * * live preview of `component`
 * * live code example
 *
 *
 * ### Example:
 *
 * ```js
 * import AutoExample from 'stories/utils/Components/AutoExample';
 * import component from 'lawrence-style-react/MyComponent';
 * import source from '!raw-loader!lawrence-style-react/MyComponent/MyComponent'; // raw string, not something like `export {default} from './MyComponent.js';`
 *
 * <AutoExample
 *   source={source}
 *   component={component}
 *   componentProps={{
 *     value: 'some default value',
 *     onClick: () => console.log('some handler')
 *   }}
 * />
 * ```
 */
export default class extends Component {
  static displayName = 'AutoExample';

  static propTypes = {
    /**
     * raw string of component source.
     *
     * uses `AutoDocs` under the hood. Read doc covering `AutoDocs` to learn more.
     *
     * Easiest is to `import source from '!raw-loader!my-component'`.
     *
     * Ensure there is only one component exported per file and the syntax is correct.
     *
     * Supported are both, functional and class components.
     * class components must have `render()` method. If you `extend` class and don't have `render()`, reconsider such
     * approach
     *
     */
    source: PropTypes.string.isRequired,

    /**
     * parsed meta object about component.
     *
     * Generated by `ComponentMetaInfoGetter` (uses `react-docgen` under the hood). Read doc covering `react-docgen` to learn more.
     *
     * Will exists in case if `ComponentMetaInfoGetter` will parse the source.
     *
     * Otherwise is't necessary to parse it manually.
     *
     */
    parsedSource: PropTypes.object,

    /**
     * reference to react component
     *
     * this is the usual `import component from 'my-component'`
     */
    component: PropTypes.func.isRequired,

    /**
     * control default props and their state of component in preview.
     *
     * can be either `object` or `function`:
     *
     * * `object` - simple javascript object which reflects `component` properties.
     * * `function` - `(setProps, getProps) => props`
     *      receives `setProps` setter and `getProps` getter. can be used to persist props state and react to event
     *      handlers and must return an object which will be used as new props. For example:
     *
     * ```js
     * <AutoExample
     *   component={ToggleSwitch}
     *   componentProps={(setProps, getProps) => ({
     *     checked: false,
     *     onChange: () => setProps({ checked: !getProps().checked })
     *   })}
     * ```
     */
    componentProps: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    exampleProps: PropTypes.object,

    /**
     * when true, display only component preview without interactive props nor code example
     */
    isInteractive: PropTypes.bool,

    previewBackground: PropTypes.string,
    wider: PropTypes.bool,
    noPreview: PropTypes.bool,
  };

  static defaultProps = {
    source: '',
    component: () => null,
    componentProps: {},
    exampleProps: {},
    isInteractive: true,
  };

  _initialPropsState = {};

  constructor(props) {
    super(props);

    this.parsedComponent = props.parsedSource;

    this.state = {
      propsState: {
        ...(this.props.component.defaultProps || {}),
        ...this.prepareComponentProps(this.props.componentProps),
      },
      funcValues: {},
      funcAnimate: {},
      isDarkBackground: false,
      theme: 'light',
    };

    this._initialPropsState = this.state.propsState;
  }

  resetState = () => this.setState({ propsState: this._initialPropsState });

  componentWillReceiveProps(nextProps) {
    this.setState({
      propsState: {
        ...this.state.propsState,
        ...this.prepareComponentProps(nextProps.componentProps),
      },
    });
  }

  prepareComponentProps = props =>
    typeof props === 'function'
      ? props(
          componentProps =>
            this.setState({
              propsState: { ...this.state.propsState, ...componentProps },
            }),

          () => this.state.propsState || {},
        )
      : props;

  mapControllableProps = fn =>
    Object.keys(this.parsedComponent.props)
      .filter(key => {
        return Object.keys(this.controllableComponentGetters).includes(
          this.parsedComponent.props[key].type.name,
        );
      })
      .map(key => fn(this.parsedComponent.props[key], key));

  setProp = (key, value) => {
    return this.setState({
      propsState: { ...this.state.propsState, [key]: value },
    });
  };

  controllableComponentGetters = {
    string: () => <Input />,
    number: () => <Input />,
    boolean: () => <CustomToggle />,

    union: ({ type }) => (
      <List values={type.elements.map(({ value }) => stripQuotes(value))} />
    ),

    custom: ({ type }) => {
      const patt = /\((.*?)\)/;
      const arr = type.raw.match(patt)[1].split(',');
      return <List values={arr.map(value => stripQuotes(value.trim()))} />;
    },

    ReactNode: ({ propKey }) =>
      this.props.exampleProps[propKey] ? (
        <NodesList values={this.props.exampleProps[propKey]} />
      ) : (
        <Input />
      ),

    signature: ({ propKey }) => {
      let classNames = 'func-example';
      if (this.state.funcAnimate[propKey]) {
        classNames += ' active';
        setTimeout(
          () =>
            this.setState({
              funcAnimate: { ...this.state.funcAnimate, [propKey]: false },
              funcValues: delete this.state.funcValues[propKey],
            }),
          2000,
        );
      }

      if (this.props.exampleProps[propKey]) {
        return (
          <div className={classNames}>
            {this.state.funcValues[propKey] || 'Interaction preview'}
          </div>
        );
      }
    },

    arrayOf: ({ propKey }) => {
      if (this.props.exampleProps[propKey]) {
        return <NodesList values={this.props.exampleProps[propKey]} />;
      }
    },

    Array: ({ propKey }) => {
      if (this.props.exampleProps[propKey]) {
        return <NodesList values={this.props.exampleProps[propKey]} />;
      }
    },

    any: ({ propKey }) => {
      if (this.props.exampleProps[propKey]) {
        return <NodesList values={this.props.exampleProps[propKey]} />;
      }
    },
  };

  getPropControlComponent = (propKey, type) => {
    return (this.controllableComponentGetters[type.name] || (() => null))({
      propKey,
      type,
    });
  };

  componentToString = component => {
    const res = reactElementToJSXString(component, {
      maxInlineAttributesLineLength: 100,
      showDefaultProps: false,
      showFunctions: false,
    });

    return res;
  };

  switch = () => {
    this.setState({ theme: this.state.theme === 'light' ? 'dark' : 'light' });
  };

  render() {
    const component = this.props.component;
    const componentPropsState = {
      ...this.state.propsState,
      ...Object.keys(this.props.exampleProps)
        .filter(
          prop => this.parsedComponent.props[prop].type.name === 'signature',
        )
        .reduce((acc, prop) => {
          acc[prop] = (...rest) => {
            if (this.state.propsState[prop]) {
              this.state.propsState[prop](...rest);
            }
            this.setState({
              funcValues: {
                ...this.state.funcValues,
                [prop]: this.props.exampleProps[prop](...rest),
              },
              funcAnimate: { ...this.state.funcAnimate, [prop]: true },
            });
          };
          return acc;
        }, {}),
    };

    const codeProps = {
      ...this.state.propsState,
      ...Object.keys(this.props.exampleProps)
        .filter(
          prop => this.parsedComponent.props[prop].type.name === 'signature',
        )
        .reduce((acc, key) => {
          acc[key] = this.props.exampleProps[key];
          return acc;
        }, {}),
    };

    if (!this.props.isInteractive) {
      return React.createElement(component, componentPropsState);
    }

    return (
      <ThemeProvider theme={{ mode: this.state.theme }}>
        <Wrapper dataHook="auto-example">
          <Options>
            {this.mapControllableProps((prop, key) => (
              <Option
                {...{
                  key,
                  label: key,
                  value: componentPropsState[key],
                  onChange: value => this.setProp(key, value),
                  children: this.getPropControlComponent(key, prop.type),
                }}
              />
            ))}
          </Options>

          <Preview
            isDarkBackground={this.state.isDarkBackground}
            onToggleBackground={isDarkBackground =>
              this.setState({ isDarkBackground })
            }
            previewBackground={this.props.previewBackground}
            noPreview={this.props.noPreview}
            wider={this.props.wider}
            toggleTheme={this.switch}
            theme={this.state.theme}
          >
            {React.createElement(component, componentPropsState)}
          </Preview>
          <Code
            source={this.componentToString(
              React.createElement(component, codeProps),
            )}
          />
        </Wrapper>
      </ThemeProvider>
    );
  }
}
