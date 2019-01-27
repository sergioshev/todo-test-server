import createHttpServer from './prepare-http-server.js';
import globals from './config/globals';


const httpServer = createHttpServer(process.env.PORT || globals.defaultPort);

httpServer.listen(process.env.PORT || globals.defaultPort);