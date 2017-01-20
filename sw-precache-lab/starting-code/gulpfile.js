/*jshint esversion:6*/
/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

//TODO 4.1 Insert the constants to require gulp and plugins
var gulp = require('gulp');
var path = require('path');
var swPrecache = require('sw-precache');

//TODO 4.2 Insert the variable and gulp task code
var paths = {
	src: './'
};

gulp.task('service-worker', function(callback) {
	swPrecache.write(path.join(paths.src, 'service-worker.js'), {
		staticFileGlobs: [
			paths.src + 'index.html',
			paths.src + 'js/main.js',
			paths.src + 'css/main.css'
			// paths.src + 'images/**/*'
		],
		importScripts: [
			paths.src + 'node_modules/sw-toolbox/sw-toolbox.js',
			paths.src + 'js/toolbox-scripts.js'
		],
		stripPrefix: paths.src
	}, callback);
});