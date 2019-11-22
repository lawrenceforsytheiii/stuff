const path = require('path');
const loaderUtils = require('loader-utils');
const pathFinder = require('./AutoDocs/Core/path-finder');
const gatherAll = require('./AutoDocs/Core/gather-all');
const metadataMerger = require('./AutoDocs/Core/metadata-merger');
const prepareStory = require('./AutoDocs/Core/prepare-story');

function runLoader(source) {
  const callback = this.async();
  const { storyConfig } = loaderUtils.getOptions(this);

  pathFinder(source)
    .then((componentPath) => gatherAll(path.join(this.context, componentPath)))

    .then(metadataMerger(source))

    .then(prepareStory(storyConfig))

    .then((finalSource) =>
       callback(null, finalSource)
    )

    .catch((e) => {
      console.log('ERROR: Failure within story loader', e);
      callback(e);
    });
}

module.exports = function(source) {
  runLoader.call(this, source);
};
