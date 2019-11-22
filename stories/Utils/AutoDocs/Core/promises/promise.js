/* global Promise */

/**
 * used to turn node.js callback style to promises
  */

const promise = fn => (...args) =>
  new Promise((resolve, reject) =>
    fn(
      ...args,
      (err, payload) =>
        err ? reject(err) : resolve(payload)
    )
  );


module.exports = promise;
