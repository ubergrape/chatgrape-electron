'use strict';

var pathUtil = require('path');
var Q = require('q');
var gulp = require('gulp');
var jetpack = require('fs-jetpack');

var utils = require('../utils');

var projectDir = jetpack;
var srcDir = projectDir.cwd('./app');
var destDir = projectDir.cwd('./build');

var paths = {
    copyFromAppDir: [
        './node_modules/**',
        './lib/**'
    ],
    watchFromAppDir: [
        './lib/**'
    ]
};

// -------------------------------------
// Tasks
// -------------------------------------

gulp.task('clean', function (callback) {
    return destDir.dirAsync('.', { empty: true });
});

var copyTask = function () {
    return projectDir.copyAsync('app', destDir.path(), {
        overwrite: true,
        matching: paths.copyFromAppDir
    });
};
var watchTask = function () {
    return projectDir.copyAsync('app', destDir.path(), {
        overwrite: true,
        matching: paths.watchFromAppDir
    });
};
gulp.task('copy', ['clean'], copyTask);
gulp.task('copy-watch', watchTask);


gulp.task('finalize', ['clean'], function () {
    var manifest = srcDir.read('package.json', 'json');

    // Add "dev" or "test" suffix to name, so Electron will write all data
    // like cookies and localStorage in separate places for each environment.
    switch (utils.getEnvName()) {
        case 'development':
            manifest.name += '-dev';
            manifest.productName += ' Dev';
            break;
        case 'test':
            manifest.name += '-test';
            manifest.productName += ' Test';
            break;
    }

    // Copy environment variables to package.json file for easy use
    // in the running application. This is not official way of doing
    // things, but also isn't prohibited ;)
    manifest.env = projectDir.read('config/env_' + utils.getEnvName() + '.json', 'json');

    destDir.write('package.json', manifest);
});


gulp.task('watch', function () {
    gulp.watch(paths.watchFromAppDir, {
        cwd: 'app',
        debounceDelay: 2000
    }, ['copy-watch']);
});

gulp.task('build', ['copy', 'finalize']);
