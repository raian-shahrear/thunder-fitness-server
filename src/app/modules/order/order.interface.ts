import { Types } from 'mongoose';

export type TOrderedProduct = {
  product: Types.ObjectId;
  quantity: number;
  productCost: number;
};

export type TOrder = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  orderedProducts: TOrderedProduct[];
  totalCost: number;
  isPaid?: boolean;
  paymentMethod: string;
  status?: 'Order placed' | 'Order processing' | 'Delivered';
};
