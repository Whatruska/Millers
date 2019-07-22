const gulp = require('gulp');
// const git = require('gulp-git');
// const sass = require('gulp-sass');
// const concat = require('gulp-concat');
// const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
// const autoprefixer = require('gulp-autoprefixer');
const gulpif = require('gulp-if');
const del = require('del');
const gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
let isProd = true;

gulp.task('pages', function () {
  return gulp.src('app/pages/**/*.*')
  .pipe(gulp.dest('public/pages'));
});

gulp.task('php', function () {
  return gulp.src('app/PHP/*.php')
  .pipe(gulp.dest('public/PHP/'));
});

gulp.task('styles', function () {
  return gulp.src('app/scss/**/*.scss')
  .pipe(plugins.sass())
  .pipe(gulpif(isProd, plugins.autoprefixer({
    overrideBrowserslist : ['last 15 versions', '> 1%', 'ie 8', 'ie 7']
  })))
  .pipe(gulpif(isProd, cleanCSS()))
  .pipe(gulp.dest('public/css'));
})

gulp.task('scripts', function () {
  return gulp.src('app/js/**/*.js')
  .pipe(gulp.dest('public/js'));
})

gulp.task('img', function () {
  return gulp.src('app/img/**')
  .pipe(gulp.dest('public/img'));
})

gulp.task('clean', function () {
  return del('public');
})

gulp.task('watch', function () {
  gulp.watch('app/pages/**/*.php', gulp.series('pages'));
  gulp.watch('app/fonts/**/*.*', gulp.series('fonts'));
  gulp.watch('app/pages/.htaccess', gulp.series('htaccess'));
  gulp.watch('app/PHP/*.php', gulp.series('php'));
  gulp.watch('app/scss/**/*.scss', gulp.series('styles'));
  gulp.watch('app/js/**/*.js', gulp.series('scripts'));
  gulp.watch('app/img/**/*.*', gulp.series('img'));
})

gulp.task('init', function(){
  plugins.git.init(function (err) {
    if (err) throw err;
  });
  plugins.git.addRemote('origin', 'https://github.com/Whatruska/Millers', function (err) {
    if (err) throw err;
  });
});

gulp.task('add', function(){
  return gulp.src('./')
    .pipe(plugins.git.add());
});

gulp.task('commit', function(){
  return gulp.src('./git-test/*')
    .pipe(plugins.git.commit('first commit'));
});

gulp.task('push', function(){
  plugins.git.push('origin', 'master', function (err) {
    if (err) throw err;
  });
});

gulp.task('git', function(){
  gulp.series('add', 'commit', 'push');
});

// gulp.task('animate', function () {
//   return gulp.src('app/libs/animate.css/**/*.*')
//   .pipe(gulp.dest('public/libs/animate'));
// })

gulp.task('webfonts', function () {
  return gulp.src('libs/Font-Awesome/webfonts/**/*.*')
  .pipe(gulp.dest('public/webfonts'));
})

gulp.task('jquery', function () {
  return gulp.src('app/libs/jquery/dist/**/*.*')
  .pipe(gulp.dest('public/libs/jquery'));
})

gulp.task('mmenu', function () {
  return gulp.src('app/libs/mmenu/dist/**/*.*')
  .pipe(gulp.dest('public/libs/mmenu'));
})

gulp.task('owl', function () {
  return gulp.src('app/libs/owl.carousel/dist/**/*.*')
  .pipe(gulp.dest('public/libs/owl.carousel'));
})

gulp.task('selectize', function () {
  return gulp.src('app/libs/selectize/dist/**/*.*')
  .pipe(gulp.dest('public/libs/selectize'));
})

gulp.task('sifter', function () {
  return gulp.src('app/libs/sifter/**/*.*')
  .pipe(gulp.dest('public/libs/sifter'));
})

gulp.task('libs', gulp.series('webfonts', 'jquery', 'mmenu', 'owl', 'selectize', 'sifter'));

gulp.task('fonts', function () {
  return gulp.src('app/fonts/**/*.*')
  .pipe(gulp.dest('public/fonts'));
})

gulp.task('htaccess', function () {
  return gulp.src('app/pages/.htaccess')
  .pipe(gulp.dest('public/pages'));
})

// gulp.task('serveServ', function () {
//   browserSync.init({
//     proxy: "vitdub.com/inet_shop/public/pages/index.php",
//     open : 'external',
//     port:      80,
//   });
//   browserSync.watch('app/**/*.*').on('change', browserSync.reload);
// });

gulp.task('serve', function() { // Создаем таск browser-sync
  browserSync.init({
      server: {
        baseDir:'public'
      }
  });
  browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('build', gulp.series('clean', 'pages', 'styles', 'htaccess', 'fonts', 'php', 'scripts', 'img', 'libs'));
gulp.task('dev', gulp.series('build', gulp.parallel('serve', 'watch')));
