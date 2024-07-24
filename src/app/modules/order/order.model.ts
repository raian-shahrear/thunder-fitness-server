import { model, Schema } from 'mongoose';
import { TOrder, TOrderedProduct } from './order.interface';

const orderedProductSchema = new Schema<TOrderedProduct>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    productCost: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const orderSchema = new Schema<TOrder>(
  {
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    orderedProducts: {
      type: [orderedProductSchema],
      required: true,
    },
    totalCost: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: 'Boolean',
      default: false,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Order placed', 'Order processing', 'Delivered'],
      default: 'Order placed',
    },
  },
  { timestamps: true },
);

export const OrderModel = model<TOrder>('Order', orderSchema);
