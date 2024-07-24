import { z } from 'zod';

const createProductValidationSchema = z.object({
  body: z.object({
    category: z.string(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    stock: z.number(),
    image: z.string(),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    category: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    stock: z.number().optional(),
    image: z.string().optional(),
    isFeaturedProduct: z.boolean().optional(),
  }),
});

export const ProductValidations = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
