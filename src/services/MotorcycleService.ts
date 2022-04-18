import MotorcycleSchema, {
  Motorcycle,
} from '../interfaces/MotorcycleInterface';
import Service, { ServiceError } from '.';
import MotorcycleModel from '../models/MotorcycleModel';

class MotorcycleService extends Service<Motorcycle> {
  constructor(model = new MotorcycleModel()) {
    super(model);
  }

  create = async (
    obj: Motorcycle,
  ): Promise<Motorcycle | ServiceError | null> => {
    const parsed = MotorcycleSchema.safeParse(obj);
    if (!parsed.success) {
      return {
        error: parsed.error,
      };
    }
    return this.model.create(obj);
  };

  read = async (): Promise<Motorcycle[]> => this.model.read();

  readOne = async (id: string): Promise<Motorcycle | ServiceError | null > =>
    this.model.readOne(id);

  update = async (id: string, obj: Motorcycle):
  Promise<Motorcycle | ServiceError | null> => this.model.update(id, obj);

  delete = async (id: string): Promise<Motorcycle | ServiceError | null > =>
    this.model.delete(id);
}

export default MotorcycleService;
