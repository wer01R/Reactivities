import { z } from 'zod';
import { requiredString } from '../util/util';


export const activitySchema = z.object({
  title: requiredString("Title"),
  description: requiredString("Description"),
  category: requiredString("Category"),
  location: z.object({
    venue: requiredString("Venue"),
    city: z.string().optional(),
    longitude: z.coerce.number(),
    latitude: z.coerce.number()
  }),

  date: z.date({required_error: "Date is required"}).min(new Date(), {message: "Date must be in the future"})
});

export type ActivitySchema = z.infer<typeof activitySchema>;