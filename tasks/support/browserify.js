var browserify = require('browserify');

module.exports = function (args) {
  return browserify({
    entries: ['./app/app.js'],
    debug: true
  }, args);
}
