import {IncomingMessage, ServerResponse} from 'http';

import {settings} from '../../../config/settings';
import {HostResponse, Server, getPathname} from '../server';

let server = new Server(settings.staticServer.host, settings.staticServer.port);

let baseUrl = server.getBaseUrl();

server.run((request: IncomingMessage, response: ServerResponse) => {
  let pathname = getPathname(request.url);
  server.sendRequest(baseUrl + request.url, pathname[2], (res: HostResponse) => {
    response.writeHead(res.status, server.headers);
    response.write(res.data);
    if (res.success) {
      server.setCache(request.url, res.data);
    }
    response.end();
  });
});
