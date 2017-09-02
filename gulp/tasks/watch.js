// adding the 'gulp' module
var gulp = require('gulp'),
watch = require('gulp-watch'), // plugin for watching the changes to the files
browserSync = require('browser-sync').create();

gulp.task('watch', function () {

	browserSync.init({
		notify: true, // telling the bs not to notify on css injections
		server: {
			baseDir: "app"
		}
	});

	watch('./app/index.html', function () {
		browserSync.reload(); // reloading the page if any changes occurs
	});
    
    watch('./app/assets/styles/**/*.css', function () {
        // we will not run this task here, we will run the cssInject task
        // gulp.start('styles');
        gulp.start('cssInject');
    });
});

// here we will provide a list of dependencies, which should run and complete
// first before running the 'cssInject' task
gulp.task('cssInject', ['styles'], function () {
	return gulp.src('./app/temp/styles/styles.css')
		.pipe(browserSync.stream());
});