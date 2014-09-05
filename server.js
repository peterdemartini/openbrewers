'use strict';

// Requires meanio
var mean = require('meanio');

// Creates and serves the application
mean.serve({ }, function(app, config) {
	var port = config.https && config.https.port ? config.https.port : config.http.port;
	console.log('Open Brewers app started on port ' + port + ' (' + process.env.NODE_ENV + ')');
});
