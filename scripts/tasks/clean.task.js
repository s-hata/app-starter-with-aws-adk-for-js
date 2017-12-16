const gulp  = require('gulp');
const gutil = require('gulp-util');
const del   = require('del');
const prj   = require('scripts/project');


gulp.task('clean', () => {

  return del([
    prj.src.dest,
    prj.e2e.dest,
    prj.reports.dest
  ]).then(
    paths => gutil.log(
      gutil.colors.cyan('[clean] '), 'Deleted files and folders:\n', paths.join('\n')),
    error => gutil.log(error)
  );
});
