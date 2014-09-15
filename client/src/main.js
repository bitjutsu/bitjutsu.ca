(function () {
    'use strict';

    var cartier = require('cartier'),
        /* Don't use velocity from npm, it has a dependency on jQuery. */
        Velocity = require('./libraries/velocity');

    require('./libraries/velocity.ui');

    var home = require('../templates/home'),
        projects = require('../templates/projects');

    var $container = document.querySelector('main');

    function doContextChange(from, to, params) {
        function swapContent() {
            $container.innerHTML = to;
        }

        Velocity($container, 'transition.slideUpOut', {
            duration: 200,
            complete: swapContent
        });

        Velocity($container, 'transition.slideUpIn', {
            duration: 200
        });
    }

    window.nav = new cartier(doContextChange);

    window.nav.setNotFoundContext('<h1>Oops!</h1>');

    window.nav.route({
        '/': home,
        '/projects': projects
    });
}());
