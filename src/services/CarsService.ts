import CarSchema, { Car } from '../interfaces/CarInterface';
import Service, { ServiceError } from '.';
import CarModel from '../models/CarsModel';

class CarService extends Service<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  create = async (
    obj: Car,
  ): Promise<Car | ServiceError | null> => {
    const parsed = CarSchema.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(obj);
  };

  update = async (id: string, obj: Car):
  Promise<Car | ServiceError | null> => this.model.update(id, obj);
}

export default CarService;
