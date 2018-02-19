const config  = require('../../../config.json')
const path = require('path')
const merge = require('merge-deep')

const rootPath = (config.paths && config.paths.root)
  ? config.paths.root
  : process.cwd();

module.exports = merge({
    /**
     * Project paths.
     *
     * @type {Object}
     */
    paths: {
        root: rootPath,
        assets: path.resolve(rootPath, 'resources/assets'),
        assetsRel: 'resources/assets',
        dist: path.resolve(rootPath, 'dist'),
        distRel: 'dist',
    },

    /**
     * Collection of application front-end assets.
     *
     * @type {Array}
     */
    assets: [],

    /**
     * List of filename schemas for different
     * application assets.
     *
     * @type {Object}
     */
    outputs: {
        css: { filename: 'css/[name].css' },
        font: { filename: 'fonts/[name].[ext]' },
        image: { filename: 'images/[name].[ext]' },
        javascript: { filename: 'js/[name].js' },
    },

    /**
     * List of libraries which will be provided
     * within application scripts as external.
     *
     * @type {Object}
     */
    externals: {
        jquery: 'jQuery',
    },

    /**
     * Settings of other build features.
     *
     * @type {Object}
     */
    settings: {
        sourceMaps: true,
        styleLint: true,
        browserSync: require('./browser-sync.json'),
    },
}, config)
