// Import router
import Router from './router';

// Import local deps
import common from './views/common';
import tpl_home from './views/tpl-home';
import page_home from './views/page-home';

// Boostrap
import 'bootstrap/dist/js/bootstrap.js'; // All of Bootstrap JS or customize if you wish.

// Use this variable to set up the common and page specific functions. If you
// rename this variable, you will also need to rename the namespace below.
// You add additional pages to this array by referencing the the body class
// and creating the js file in the views directory. Remember to import the
// file as per the common example near the top of this file.
const views = {
  // All pages
  common,

  // Templates
  tpl_home,

  // Pages
  page_home,
};

// Load Events
document.addEventListener('DOMContentLoaded', () => new Router(views).loadEvents());

// Window Loaded
window.onload = () => new Router(views).loadEvents('loaded');
