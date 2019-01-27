import http from 'http';

import initApp from './init-app';
import globals from './config/globals';


const onError = (port) => {
	return (error) => {
		if (error.syscall !== 'listen') throw error;
		const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
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
}

const onListening = (server) => () => {
	const addr = server.address();
	const bind = typeof addr === 'string'
	  ? 'pipe ' + addr
	  : 'port ' + addr.port;
  console.log(`HTTP server listening on ${bind}`);
};

export default function createHttpServer(port = globals.defaultPort) {
	const {app} = initApp();
  app.set('port', port);
  const server = http.createServer(app);

  server.on('error', onError(port));
  server.on('listening', onListening(server));
  server.on('close', () => console.log('HTTP server stopped'));

	return server;
}