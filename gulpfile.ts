
import * as  gulp from 'gulp';
import { createProject } from 'gulp-typescript';
const clean = require('gulp-clean');
const nodemon = require('gulp-nodemon');
var tsProject = createProject('tsconfig.json');
const paths = {
	pages: ['./src/server/views/*.*']
}

gulp.task('clean:server', () => {
	return gulp.src('./dist/server', { read: false })
		.pipe(clean());
});

gulp.task('copy:html', ['clean:server'], () => {
	return gulp.src(paths.pages)
		.pipe(gulp.dest('./dist/server/views'))
});


gulp.task('ts', [], () => {
	gulp.src('./src/server/**/*.ts')
		.pipe(tsProject())
		.js.pipe(gulp.dest('./dist/server'));
});

gulp.task('demon', ['ts'], () => {
	nodemon({
		script: './bin/www',
		cwd: __dirname,
		watch: ['./src/server'],
		ignore: ['node_modules/**'],
		ext: 'ts,ejs',
		env: {
			'NODE_ENV': 'development'
		}
	}).on('start', ['ts'])
		.on('change', ['ts'])
		.on('restart', () => {
			console.log('restart');
		})
});

gulp.task('default', ['demon'])
