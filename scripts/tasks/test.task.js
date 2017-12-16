const path       = require('path');
const gulp       = require('gulp');
const gutil      = require('gulp-util');
const plumber    = require('gulp-plumber');
const jasmine    = require('gulp-jasmine');
const reporters  = require('jasmine-reporters');
const istanbul   = require('gulp-istanbul');
const register   = require('babel-register');
const prj        = require('scripts/project');

let coverageVariable;

gulp.task('_pre-process', function () {
  coverageVariable = '$$cov_' + new Date().getTime() + '$$';
  gutil.log('!!!');
  return gulp.src([path.join(prj.src.src, '**/*.js'), '!**/*[Ss]pec.js'])
    .pipe(plumber())
    .pipe(istanbul({ instrumenter: require('isparta').Instrumenter,
                     coverageVariable: coverageVariable }))
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['_pre-process'], () => {
  gutil.log('test starting...');

  const jasmineOptions = {
    spec_dir: path.join(prj.src.src),
    stopSpecOnExpectationFailure: false
  };

  const reporterOptions = {
    savePath: path.join(prj.reports.dest, 'ut'),
    consolidateAll: false
  };

  const reporter = new reporters.TerminalReporter(reporterOptions);

  const coverageOptions = {
    coverageVariable: coverageVariable,
    dir: path.join(prj.reports.dest, 'ut-coverage'),
    reporters: [ 'json', 'text', 'html' ],
    reportOpts: { dir: path.join(prj.reports.dest, 'ut-coverage') }
  };

  gulp.src(path.join(prj.src.src, '**/*[sS]pec.js'))
    .pipe(plumber())
    .pipe(jasmine({
      config: jasmineOptions
    }))
    .pipe(istanbul.writeReports(coverageOptions))
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 80 } }))
    .on('error', (error) => {
    });

});
