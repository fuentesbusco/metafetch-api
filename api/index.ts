import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Request, Response } from 'express';

let cachedServer: express.Express;

const bootstrapServer = async (): Promise<express.Express> => {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);
  await app.init();
  return expressApp;
};

export default async function handler(req: Request, res: Response) {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  return cachedServer(req, res);
}
