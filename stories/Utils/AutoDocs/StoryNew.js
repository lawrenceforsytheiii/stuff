import React from 'react';

import TabbedView from './DocsComponents/TabbedView';
import Markdown from './DocsComponents/Markdown';
import CodeBlock from './DocsComponents/CodeBlock';
import AutoExample from './AutoExample';
import AutoDocs from './AutoDocs';
import StoryContainer from '../StoryContainer';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { Fonts } from '@lawrence/ui-lib';

const styles = {};

const isE2E = global.self === global.top;

const theme = createMuiTheme({
  typography: {
    fontFamily: Fonts.fontFamily,
  },
  palette: {
    primary: blue,
  },
});

export default ({
  category,
  component,
  storyName,
  previewBackground,
  noPreview,
  wider,
  componentProps,
  examples,
  exampleProps,
  _config: config,
  _metadata: metadata,
}) =>
  config
    .storiesOf(category, module)
    .add(storyName || metadata.displayName, () => {
      if (isE2E) {
        return (
          <div>
            {/* <AutoExample
              isInteractive={false}
              ref={ref => (global.autoexample = ref)}
              component={component}
              componentProps={componentProps}
              parsedSource={metadata}
            /> */}

            {examples}
          </div>
        );
      }

      const tabs = [
        'Usage',
        'API',
        ...(metadata.readmeTest ? ['Tests'] : []),
        ...(metadata.readmeAccessibility ? ['Accessibility'] : []),
      ];

      metadata.props &&
        Object.keys(metadata.props).map(key => {
          metadata.props[key].type = metadata.props[key].flowType;
          if (
            metadata.props[key].flowType.name === 'union' &&
            metadata.props[key].flowType.raw &&
            metadata.props[key].flowType.raw.startsWith('string')
          ) {
            metadata.props[key].type.name = 'string';
          }
          return null;
        });

      if (!metadata.props) metadata.props = {};

      return (
        <MuiThemeProvider theme={theme}>
          <StoryContainer>
            <TabbedView tabs={tabs}>
              <div className={styles.usage}>
                <Markdown source={`# \`<${metadata.displayName} />\``} />

                <p>{metadata.description}</p>

                {metadata.readme && (
                  <Markdown
                    source={metadata.readme}
                    watch
                    path={metadata.componentPath}
                  />
                )}

                {/* {metadata.displayName && (
              <div className={styles.githubLink}>
                <a
                  href={`${config.repoBaseURL}${metadata.displayName}`}
                  target="_blank"
                >
                  View source
                </a>
              </div>
            )} */}

                {metadata.displayName && (
                  <CodeBlock
                    source={`import { ${metadata.displayName} } from '${
                      config.moduleName
                    }';`}
                  />
                )}

                <AutoExample
                  component={component}
                  parsedSource={metadata}
                  componentProps={componentProps}
                  exampleProps={exampleProps}
                  previewBackground={previewBackground}
                  noPreview={noPreview}
                  wider={wider}
                />

                {examples}
              </div>

              <AutoDocs parsedSource={metadata} />

              {metadata.readmeTest && <Markdown source={metadata.readmeTest} />}

              {metadata.readmeAccessibility && (
                <Markdown source={metadata.readmeAccessibility} />
              )}
            </TabbedView>
          </StoryContainer>
        </MuiThemeProvider>
      );
    });
