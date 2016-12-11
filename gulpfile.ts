
import * as  gulp from 'gulp';
import { createProject } from 'gulp-typescript';

var tsProject = createProject("tsconfig.json");
const paths = {
    pages: ['./views/*.*']
}

gulp.task('copy:html', function() {
    return gulp.src(paths.pages)
        .pipe(gulp.dest('./dist/server/views'))
});


gulp.task("default", ['copy:html'], function() {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("./dist/server"));
});