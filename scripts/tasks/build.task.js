const path       = require('path');
const gulp       = require('gulp');
const gutil      = require('gulp-util');
const sourcemaps = require("gulp-sourcemaps");
const concat     = require("gulp-concat");
const babel      = require("gulp-babel");
const prj        = require('scripts/project');

gulp.task('build', () => {
  gutil.log(
    gutil.colors.cyan('[build] '),
    'starting...\n');

  return gulp.src([path.join(prj.src.src, '**/*.js'), '!**/*[Ss]pec.js'])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("bundle.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(prj.src.dest));
});
