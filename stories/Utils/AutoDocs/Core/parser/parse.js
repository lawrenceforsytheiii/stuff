const babylon = require('babylon');

const parse = source =>
  babylon.parse(source, {
    plugins: ['flow', 'jsx', 'classProperties', 'objectRestSpread'],
    sourceType: 'module',
  });

module.exports = parse;
