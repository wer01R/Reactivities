import { z } from 'zod';

const requiredString = (fieldName: string) => 
  z.string({required_error: `${fieldName} is required`})
    .min(1, `${fieldName} is required`)  

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

  date: z.date({required_error: "Date is required"})
});

export type ActivitySchema = z.infer<typeof activitySchema>;