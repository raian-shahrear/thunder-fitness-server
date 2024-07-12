import { z } from 'zod';

const createProductValidationSchema = z.object({
  body: z.object({
    category: z.string(),
    product: z.object({
      name: z.string(),
      description: z.string(),
      price: z.number(),
      stock: z.number(),
      image: z.string(),
    }),
  }),
});

export const ProductValidations = {
  createProductValidationSchema,
};
