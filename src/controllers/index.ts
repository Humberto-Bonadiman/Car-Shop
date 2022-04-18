import { Request, Response } from 'express';
import Service from '../services/index';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  characters = 'Id must have 24 hexadecimal characters',
  requiredId = 'Id is required',
  badRequest = 'Bad request',
}

abstract class Controller<T> {
  abstract route: string;

  public errors = ControllerErrors;

  constructor(protected service: Service<T>) { }

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  read = async (
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const objs = await this.service.read();
      return res.json(objs);
    } catch (err) {
      return res.status(400).json({ error: this.errors.internal });
    }
  };

  abstract readOne(
    req: Request<{ id: string; }>,
    res: Response<T | ResponseError>
  ): Promise<typeof res>;

  abstract update(
    req: Request<{ id: string, obj: T }>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  abstract delete(
    req: Request<{ id: string; }>,
    res: Response<T | ResponseError>
  ): Promise<typeof res>;
}

export default Controller;