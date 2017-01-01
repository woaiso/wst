/**
 * 启动Web服务
 */

import { Server } from './server';
import { createServer } from 'http';

var debug = require('debug')('express:server');
var http = require('http');

//create http server
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3001
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

var app = Server.bootstrap().app;
app.set('port', server_port);
var httpServer = createServer(app);

//listen on provided ports
httpServer.listen(server_port, server_ip_address);

//add error handler
httpServer.on('error', onError);

//start listening on port
httpServer.on('listening', onListening);


/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
	var port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	var bind = typeof server_port === 'string'
		? 'Pipe ' + server_port
		: 'Port ' + server_port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
	var addr = httpServer.address();
	var bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port;
	debug('Listening on ' + bind);
}
