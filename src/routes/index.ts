import express, { Express } from 'express';
import helmet from 'helmet';
import root from './root.routes';
import fallback from './fallback.routes';
import images from './images.routes';
import libraries from './libraries.routes';

export default function routes(app: Express): void {
  app.use(express.json()); // json by default
  app.use(helmet()); // secure app with HTTP headers
  app.use('/', root);
  app.use('/api/v1/images', images);
  app.use('/api/v1/libraries', libraries);
  app.use('*', fallback); // This route must be placed last
}
