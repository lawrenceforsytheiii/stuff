const recast = require('recast');
const { utils } = require('react-docgen');

const {
  isExportsOrModuleAssignment,
  isReactComponentClass,
  isReactCreateClassCall,
  isStatelessComponent,
  normalizeClassDefinition,
  resolveExportDeclaration,
  resolveToValue,
} = utils;

const n = recast.types.namedTypes;

const ERROR_MULTIPLE_DEFINITIONS =
  'Multiple exported component definitions found.';

const isReactComponentExtendedClass = path => {
  const node = path.node;

  if (!n.ClassDeclaration.check(node) && !n.ClassExpression.check(node)) {
    return false;
  }

  if (!node.superClass) {
    return false;
  }

  // eslint-disable-next-line
  console.warn(
    `<AutoDocs/> Warning: ${node.id.name} extends ${
      node.superClass.name
    } instead of React.Component. Auto generated documentation may be incomplete!`,
  );
  return true;
};

const isComponentDefinition = path =>
  [
    isReactCreateClassCall,
    isReactComponentClass,
    isReactComponentExtendedClass,
    isStatelessComponent,
  ].some(fn => fn(path));

const resolveHOC = path => {
  const node = path.node;

  if (n.CallExpression.check(node) && !isReactCreateClassCall(path)) {
    if (node.arguments.length) {
      return resolveHOC(path.get('arguments', node.arguments.length - 1));
    }
  }

  return path;
};

const resolveDefinition = definition => {
  if (isReactCreateClassCall(definition)) {
    const resolvedPath = resolveToValue(definition.get('arguments', 0));
    if (n.ObjectExpression.check(resolvedPath.node)) {
      return resolvedPath;
    }
  } else if (
    isReactComponentClass(definition) ||
    isReactComponentExtendedClass(definition)
  ) {
    normalizeClassDefinition(definition);
    return definition;
  } else if (isStatelessComponent(definition)) {
    return definition;
  }

  return null;
};

const componentResolver = (ast, recast) => {
  let definition;

  const exportDeclaration = path => {
    const definitions = resolveExportDeclaration(path).reduce(
      (acc, definition) => {
        if (isComponentDefinition(definition)) {
          acc.push(definition);
        } else {
          const resolved = resolveToValue(resolveHOC(definition));
          if (isComponentDefinition(resolved)) {
            acc.push(resolved);
          }
        }

        return acc;
      },
      [],
    );

    if (definitions.length === 0) {
      return false;
    }

    if (definitions.length > 1 || definition) {
      throw new Error(ERROR_MULTIPLE_DEFINITIONS);
    }

    definition = resolveDefinition(definitions[0]);
    return false;
  };

  recast.visit(ast, {
    visitExportDeclaration: exportDeclaration,
    visitExportNamedDeclaration: exportDeclaration,
    visitExportDefaultDeclaration: exportDeclaration,

    visitAssignmentExpression: path => {
      if (!isExportsOrModuleAssignment(path)) {
        return false;
      }

      path = resolveToValue(path.get('right'));

      if (!isComponentDefinition(path)) {
        path = resolveToValue(resolveHOC(path));
        if (!isComponentDefinition(path)) {
          return false;
        }
      }

      if (definition) {
        throw new Error(ERROR_MULTIPLE_DEFINITIONS);
      }

      definition = resolveDefinition(path);

      return false;
    },
  });

  return definition;
};

module.exports = componentResolver;
