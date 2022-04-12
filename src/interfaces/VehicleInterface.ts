import { z } from 'zod';

export const VehicleSchema = z.object({
  model: z.string({ required_error: 'Model is required' }).min(3),
  year: z.number({ required_error: 'Year is required' }).gte(1900).lte(2022),
  color: z.string({ required_error: 'Color is required' }).min(3),
  status: z.boolean({ required_error: 'Status is required' }).optional(),
  buyValue: z.number({ required_error: 'BuyValue is required' }).int() });

export type Vehicle = z.infer<typeof VehicleSchema>;
