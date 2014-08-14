var gulp  = require('gulp');
var path  = require('path');
var karma = require('karma').server;

gulp.task('test', function (done) {
  return karma.start({
    singleRun: true,
    configFile: path.join(__dirname, 'support', 'karma.conf.js')
  }, done);
});
