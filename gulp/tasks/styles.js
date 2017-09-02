// adding the 'gulp' module
var gulp = require('gulp'),
postcss = require('gulp-postcss'), // plugin to use the 'postcss'
autoprefixer = require('autoprefixer'), // plugin to use the 'autoprefixer' feature
cssvars = require('postcss-simple-vars'), // plugin to use the variables in css
nestedcss = require('postcss-nested'), // plugin to write the nested css
cssImport = require('postcss-import'), // to download the code where the import is there
mixins = require('postcss-mixins');

// Making the CSS Workflow for the project
/*
* Adding the src folder to take the files,
* then adding the destination folder through PIPE for the flow
* We can add multiple pipes in between before getting the final files in the destination
*/

/*
Error Hadeling in the GULP flow

It may possible that in our CSS we left out with some errors which can
lead to the 'watch' task to an end and intrupting the flow. 

In this case we need to handle our errors so that the last action, 
which depends on the previous action to complete or END, should go 
smoothly and should know that the previous actions came to an END 
even tough there was an error
*/

gulp.task('styles', function () {
    return gulp.src('./app/assets/styles/styles.css')
    	.pipe(postcss([cssImport, mixins, cssvars, nestedcss, autoprefixer]))
    	.on('error', function (errorInfo) {
    		console.log(errorInfo.toString());
    		this.emit('end');
    	})
    	.pipe(gulp.dest('./app/temp/styles'));
});
