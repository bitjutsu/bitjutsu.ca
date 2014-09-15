(function () {
    var express = require('express');

    var app = express();

    /* Serve static assets before delegating to routes. */
    app.use(express.static('assets', __dirname + '/assets'));

    /* Always serve index.html regardless of the path: */
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/assets/index.html');
    });

    app.listen(process.env.OPENSHIFT_NODEJS_PORT || 3000);
}());
