// Returns a function that can be added to express.js with similar semantics to
// get(...), post(...) etc with the difference that the last argument can return
// a function whose resolve value is an object to be converted to JSON
module.exports.wrap = function(expressApp, oldFunctionName) {
  return function(...args) {
    // call() needed because arguments is not an array
    const [last] = Array.prototype.slice.call(args, -1);
    const rest = Array.prototype.slice.call(args, 0, -1);
    // Wrap the route function
    const wrapped = (req, res, next) => Promise.resolve(last(req, res, next))
      .then(result => res.json(result))
      .catch(err => next(err));
    expressApp[oldFunctionName].call(expressApp, ...rest, wrapped);
  };
};
