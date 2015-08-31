import bg from 'gulp-bg';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import path from 'path';
import runSequence from 'run-sequence';
import yargs from 'yargs';
import webpack from 'webpack';
import gutil from 'gulp-util';
import WebpackDevServer from 'webpack-dev-server';
import {Server as KarmaServer} from 'karma';

const BASE_PATH = __dirname;
const BUILD_PATH = path.join(BASE_PATH, 'build');
const ASSET_PATH = path.join(BASE_PATH, 'assets');
const SRC_PATH = path.join(BASE_PATH, 'src');

const args = yargs
    .alias('p', 'production')
    .argv;
const env = args.production ? 'production' : 'development';
const devel = env === 'development';

// gulp pipe target
const runKarma = ({singleRun}, done) => {
    const server = new KarmaServer({
        configFile: path.join(__dirname, 'karma.conf.js'), // eslint-disable-line no-undef
        singleRun: singleRun
    }, done);
    server.start();
};

// gulp task
const runEslint = () => {
    return gulp.src([
        'gulpfile.babel.js',
        'src/**/*.js',
        '!**/__tests__/*.*'
    ])
    .pipe(eslint())
    .pipe(eslint.format());
};

const webpack_dev = require('./webpack.config.js');

/**
 * Webpack build
 */
const webpackBuild = () => {
    return function(callback) {
        const pack = webpack((devel ? webpack_dev : null), function(fatalError, stats) {
            var jsonStats = stats.toJson();

            var buildError = fatalError || jsonStats.errors[0] || jsonStats.warnings[0];

            if (buildError) {
                throw new gutil.PluginError('webpack', buildError);
            }

            gutil.log('[webpack]', "\n"+stats.toString({
                colors: true,
                version: false,
                hash: false,
                timings: false,
                chunks: false,
                chunkModules: false
            }));

        });
        new WebpackDevServer(pack, {
            contentBase: 'http://localhost:8888',
            hot: true,
            quiet: false,
            //noInfo: true,
            // Remove console.log mess during watch.
            stats: {
                assets: true,
                colors: true,
                version: false,
                hash: false,
                timings: false,
                chunks: false,
                chunkModules: false
            }
        }).listen(8888, 'localhost', function(err) {
            if (err)
                throw new gutil.PluginError('webpack-dev-server', err);
            callback();
        });
    };
};

gulp.task('build-webpack', webpackBuild());
gulp.task('build', ['build-webpack']);

gulp.task('eslint', () => {
    return runEslint();
});

gulp.task('eslint-ci', () => {
    // Exit process with an error code (1) on lint error for CI build.
    return runEslint().pipe(eslint.failOnError());
});

gulp.task('karma-ci', (done) => {
    runKarma({singleRun: true}, done);
});

gulp.task('karma', (done) => {
    runKarma({singleRun: false}, done);
});

gulp.task('test', (done) => {
    runSequence('eslint-ci', 'karma-ci', 'build-webpack-production', done);
});

gulp.task('server', ['build']);

gulp.task('tdd', (done) => {
    // Run karma configured for TDD.
    runSequence('server', 'karma', done);
});

gulp.task('default', ['server']);
