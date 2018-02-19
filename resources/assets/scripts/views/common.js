// If we need jQuery
// var $ = window.jQuery;

// Import svg4everybody from node-modules
import svg4everybody from 'svg4everybody';

// Import shareable project libraries
import setEnv from '../libs/setEnv';
import debug from '../libs/debug';
import smartOutline from '../libs/smartOutline';

export default {
  init() {
    // JavaScript to be fired on all pages
    svg4everybody();
    setEnv.init();
    debug.init();
    smartOutline.init();
  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
  },
  loaded() {
    // Javascript to be fired on page once fully loaded
  },
};
