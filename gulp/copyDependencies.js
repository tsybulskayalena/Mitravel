const gulp = require('gulp')

const concat = require('gulp-concat')
const terser = require('gulp-terser')

module.exports = function copyDependencies() {
  gulp.src('#src/assets/videos/**/*.*').pipe(gulp.dest('./dist/assets/videos/'))
  gulp.src('#src/PHPMailer/**/*.*').pipe(gulp.dest('./dist/PHPMailer/'))
  return gulp.src([
      'node_modules/svg4everybody/dist/svg4everybody.legacy.min.js',
      'node_modules/swiper/swiper-bundle.min.js',
      '#src/assets/libs/*.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(terser())
    .pipe(gulp.dest('./dist/scripts/'))
}
