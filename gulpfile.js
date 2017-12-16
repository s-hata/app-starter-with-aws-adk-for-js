process.env['NODE_PATH'] = __dirname;
require('module')._initPaths();
const gulp  = require('gulp');
const gutil = require('gulp-util');
const path  = require('path');
const prj   = require('scripts/project');

// load sub tasks.
require('scripts/tasks/clean.task');
require('scripts/tasks/build.task');
require('scripts/tasks/test.task');
require('scripts/tasks/lint.task');


gulp.task('default', ['dev'], () => {
  gulp.watch(path.join(prj.src.src, '**/**.js'), ['dev']);
});

gulp.task('dev', ['lint', 'test']);
