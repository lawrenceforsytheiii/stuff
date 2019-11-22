const { parse } = require('react-docgen');

const componentResolve = require('./component-resolve');

const reactDocgenParse = (source, { path }) => parse(source, componentResolve);

module.exports = reactDocgenParse;
