import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

const CarSchema = VehicleSchema.extend({
  doorsQty: z.number({ required_error: 'DoorsQty is required' }).min(2, {
    message: 'doorsQty cannot be less than 2',
  }).max(4, {
    message: 'doorsQty cannot be greater than 4',
  }),
  seatsQty: z.number({ required_error: 'SeatsQty is required' }).min(2, {
    message: 'seatsQty cannot be less than 2',
  }).max(7, {
    message: 'seatsQty cannot be greater than 7',
  }),
});

export type Car = z.infer<typeof CarSchema>;
export default CarSchema;
