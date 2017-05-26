const fs = require('fs');

const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const gplumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cssShorthand = require('gulp-shorthand');
const cleanCSS = require('gulp-clean-css');
const gcmq = require('gulp-group-css-media-queries');

const uglify = require('gulp-uglify');
const babelify = require('babelify');
const browserify = require('browserify');

const errorHandler = function() {
    return gplumber(function(error) {
        console.log(error.message);
    })
};

const autoprefixerOptions = {
    browsers: ['last 2 versions', '> 1%', 'Firefox ESR']
};

gulp.task('sass', () => {
    return gulp.src('src/styles/style.scss')
        .pipe(errorHandler())
        .pipe(sass.sync({outputStyle: 'expanded'}))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(cssShorthand())
        .pipe(gcmq())
        .pipe(gulp.dest('dist'))
});

gulp.task('minify-css', ['sass'], () => {
    return gulp.src('dist/style.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest())
});

gulp.task('icons', () => {
    return gulp.src('node_modules/font-awesome/fonts/**.*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('bundle', () => {
    return browserify({
    entries: [
      'src/js/app.js'
    ]
  })
  .transform(babelify.configure({
    presets: ["es2015", "react"]
  }))
  .bundle()
  .pipe(fs.createWriteStream("dist/bundle.js"));
})

gulp.task('copy-images', () => {
    gulp.src('assets/images/*')
        .pipe(gulp.dest('dist/images'))
})

gulp.task('watch', ['bundle', 'sass'], () => {
    gulp.watch('src/js/**/*.js', ['bundle'])
    gulp.watch('src/styles/**/*.scss', ['sass'])
})

gulp.task('default', ['icons', 'sass', 'copy-images', 'bundle', 'watch']);
gulp.task('production', ['sass', 'bundle', 'minify-css']);
