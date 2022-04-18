import { Request, Response } from 'express';
import Controller, { RequestWithBody, ResponseError } from '.';
import MotorcycleService from '../services/MotorcycleService';
import { Motorcycle } from '../interfaces/MotorcycleInterface';

export default class MotorcycleController extends Controller<Motorcycle> {
  private $route: string;

  constructor(
    public service = new MotorcycleService(),
    route = '/motorcycles',
  ) {
    super(service);
    this.$route = route;
  }

  get route() { return this.$route; }

  create = async (
    req: RequestWithBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    const motorcycle = await this.service.create(body);
    try {
      if (!motorcycle) {
        return res.status(500).json({ error: this.errors.internal });
      }
      if ('error' in motorcycle) {
        return res.status(400).json(motorcycle);
      }
      return res.status(201).json(motorcycle);
    } catch (error) {
      return res.status(400).json({ error: this.errors.internal });
    }
  };

  read = async (
    _req: Request,
    res: Response<Motorcycle[] | ResponseError | []>,
  ): Promise<typeof res> => {
    try {
      const motorcycle = await this.service.read();
      return res.status(200).json(motorcycle);
    } catch (error) {
      return res.status(400).json({ error: this.errors.characters });
    }
  };

  readOne = async (
    req: Request<{ id: string; }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const motorcycle = await this.service.readOne(id);
      return motorcycle
        ? res.json(motorcycle)
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(400).json({ error: this.errors.characters });
    }
  };

  update = async (
    req: Request<{ id: string; }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {  
    const { id } = req.params;
    const { body } = req;
    try {
      const motorcycle = await this.service.update(id, body);
      if (!motorcycle) {
        return res.status(404)
          .json({ error: this.errors.notFound });
      }
      return res.json(motorcycle);
    } catch (err) {
      return res.status(400).json({ error: this.errors.characters });
    }
  };

  delete = async (
    req: Request<{ id: string; }>,
    res: Response<Motorcycle | null | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const motorcycle = await this.service.delete(id);
      return motorcycle
        ? res.status(204).json()
        : res.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}