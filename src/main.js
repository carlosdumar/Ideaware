var loadCSS = require('./javascript/lib/loadCSS');

require('./javascript/lib/navbar-menu.js');
require('./javascript/app.route.js');
require('./javascript/app.js');
require('./javascript/home/home.service.js');
require('./javascript/home/home.directive.js');
require('./javascript/home/home.controller.js');



loadCSS('https://fonts.google.com/specimen/Open+Sans?selection.family=Open+Sans');
loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css');
