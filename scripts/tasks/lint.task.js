const path       = require('path');
const gulp       = require('gulp');
const gutil      = require('gulp-util');
const plumber    = require('gulp-plumber');
const eslint     = require('gulp-eslint');
const prj        = require('scripts/project');

gulp.task('lint', () => {
  return gulp.src([path.join(prj.src.src, '**/*.js'), '!**/*[Ss]pec.js'])
    .pipe(plumber({
      errorHandler: function(error) {
        var taskName = 'eslint';
        var title = '[task]' + taskName + ' ' + error.plugin;
        var errorMsg = 'error: ' + error.message;
        console.error(title + '\n' + errorMsg);
      }
    }))
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
    .pipe(plumber.stop());
});
