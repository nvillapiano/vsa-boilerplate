import Popper from 'popper.js/dist/umd/popper';
window.Popper = Popper;

// Replace no-js class
document.documentElement.className = document.documentElement.className.replace("no-js","js");
