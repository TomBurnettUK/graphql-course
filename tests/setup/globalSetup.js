import '@babel/polyfill/noConflict';

import server from '../../src/server';

export default async () => {
  global.server = await server.start();
};
