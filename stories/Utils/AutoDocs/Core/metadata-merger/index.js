/* global Promise */

const recast = require('recast');

const parse = require('../parser/parse');
const visit = require('../parser/visit');
const print = require('../parser/print');
const builders = recast.types.builders;

const metadataMerger = source => metadata => {
  return new Promise(
    (resolve, reject) =>
      source && metadata
        ? resolve(parse(source))
        : reject(
            'ERROR: unable to merge `metadata` into exported story config, ensure `source` & `metadata` are defined',
          ),
  ).then(ast => {
    const metadataAST = parse(`(${JSON.stringify(metadata)})`);
    let metadataProperties;
    let count = 0;

    visit(metadataAST)({
      ObjectExpression(path) {
        if (count === 0) {
          metadataProperties = path.node.properties;
        }
        count++;
      },
    });

    if (!metadataProperties) {
      return Promise.reject('ERROR: Unable to merge metadata with source');
    }

    visit(ast)({
      ExportDefaultDeclaration(path) {
        path.node.declaration.properties.push(
          builders.objectProperty(
            builders.identifier('_metadata'),
            builders.objectExpression(metadataProperties),
          ),
        );

        return false;
      },
    });

    return print(ast);
  });
};

module.exports = metadataMerger;
