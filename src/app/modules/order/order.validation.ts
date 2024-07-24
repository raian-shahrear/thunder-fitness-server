import { z } from 'zod';

const createOrderedProductSchema = z.object({
  product: z.string(),
  quantity: z.number(),
  productCost: z.number(),
});

const createOrderValidationSchema = z.object({
  body: z.object({
    customerName: z.string(),
    customerEmail: z.string().email(),
    customerPhone: z.string(),
    deliveryAddress: z.string(),
    orderedProducts: z.array(createOrderedProductSchema),
    totalCost: z.number(),
    isPaid: z.boolean().optional(),
    paymentMethod: z.string(),
    status: z
      .enum(['Order placed', 'Order processing', 'Delivered'])
      .optional(),
  }),
});

export const OrderValidations = {
  createOrderValidationSchema,
};
