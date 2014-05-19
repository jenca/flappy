var fs = require('fs-extra'),
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ lazy: false, camelize: true });

var paths = {
  src : {
    html: 'src/*.html',
    styles: 'src/styles/**/*.css',
    scripts: [
        "src/scripts/game/states/boot.js",
        "src/scripts/game/states/preload.js",
        "src/scripts/game/prefabs/bird.js",
        "src/scripts/game/prefabs/ground.js",
        "src/scripts/game/prefabs/pipe.js",
        "src/scripts/game/prefabs/pipeGroup.js",
        "src/scripts/game/states/menu.js",
        "src/scripts/game/states/play.js",
        "src/scripts/main.js"
    ],
    images: 'src/images/**/*',
    sounds: 'src/sounds/**/*',
    fonts: 'src/fonts/**/*'
  },
  dest : {
    html: '../flappy_bird_gh',
    styles: '../flappy_bird_gh/css',
    scripts: '../flappy_bird_gh/js',
    images: '../flappy_bird_gh/assets',
    sounds: '../flappy_bird_gh/assets',
    fonts: '../flappy_bird_gh/assets'
  }
};

gulp.task('html', function() {
  return gulp.src(paths.src.html)
    .pipe($.minifyHtml())
    .pipe(gulp.dest(paths.dest.html))
    .pipe($.connect.reload());
});

gulp.task('styles', function() {
  return gulp.src(paths.src.styles)
    .pipe($.concat('app.css'))
    .pipe($.csso())
    .pipe(gulp.dest(paths.dest.styles))
    .pipe($.connect.reload());
});

gulp.task('scripts', function() {
  return gulp.src(paths.src.scripts)
    .pipe($.uglify())
    .pipe($.concat('app.js'))
    .pipe(gulp.dest(paths.dest.scripts))
    .pipe($.connect.reload());
});

gulp.task("vendor", function(){
    $.bowerFiles().pipe(gulp.dest(paths.dest.scripts));
});

gulp.task('images', function() {
 return gulp.src(paths.src.images)
    .pipe($.imagemin({optimizationLevel: 3}))
    .pipe(gulp.dest(paths.dest.images))
    .pipe($.connect.reload());
});

gulp.task('sounds', function() {
 return gulp.src(paths.src.sounds, { read: false })
    .pipe(gulp.dest(paths.dest.sounds))
    .pipe($.connect.reload());
});

gulp.task('fonts', function() {
 return gulp.src(paths.src.fonts, { read: false })
    .pipe(gulp.dest(paths.dest.fonts))
    .pipe($.connect.reload());
});

gulp.task('connect', $.connect.server({
  root: [paths.dest.html],
  port: 8080,
  livereload: true
}));

gulp.task('watch', function() {
  gulp.watch(paths.src.html, ['html']);
  gulp.watch(paths.src.styles, ['styles']);
  gulp.watch(paths.src.scripts, ['scripts']);
  gulp.watch(paths.src.images, ['images']);
  gulp.watch(paths.src.sounds, ['sounds']);
});

gulp.task('clean', function() {
  fs.removeSync(paths.dest.html, function (err) {
    if (err) throw err;
  });
});

gulp.task('test', function() {
  return gulp.src('test/**/*.js')
    .pipe($.mocha());
});

gulp.task('build', ['html', 'styles', 'scripts', 'vendor', 'images', 'sounds', 'fonts']);

gulp.task('dev', ['build', 'connect', 'watch']);

gulp.task('default', ['build', 'watch']);
