const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
});


gulp.task('styles',function (){
    return gulp.src("src/sass/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({
            prefix:"",
            suffix:".min",
        }))
        .pipe(autoprefixer({
           browsers: ['last 2 versions'],
            cascade: false
        }))

        .pipe(gulp.dest("src/css"))/*konvertiruet sass v css*/
        .pipe(browserSync.stream())/*browser style budet obnovliaSIA v priamom efire*/ /*.pipe- podzadachia*/ //gulp.task- zadachia
})/*konvertazia sass v css*/

gulp.task('watch', function (){
    gulp.watch("src/sass/*.+(scss|sass)",gulp.parallel("styles"));
    gulp.watch('src/*html').on("change",browserSync.reload); /*gulp.watch--smotrit na izmenenia*/
})




gulp.task('default',gulp.parallel('watch','server','styles')) /*parallelno podcluchaiut*/



    /*.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) /*ssshimat file*/