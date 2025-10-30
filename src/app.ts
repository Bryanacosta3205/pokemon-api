import express, { Application } from 'express';
import cors from 'cors';
import { config } from './config';
import routes from './routes';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares(): void {
    this.app.use(
      cors({
        origin: config.corsOrigin,
      })
    );

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(): void {
    this.app.use('/', routes);
  }
}

export default new App().app;
