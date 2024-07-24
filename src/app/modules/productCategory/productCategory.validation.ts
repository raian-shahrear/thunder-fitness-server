import { z } from 'zod';

const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    image: z.string(),
  }),
});

export const CategoryValidations = {
  createCategoryValidationSchema,
};
