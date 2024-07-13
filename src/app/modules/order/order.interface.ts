import { Types } from 'mongoose';

export type TOrderedProduct = {
  product: Types.ObjectId;
  quantity: number;
};

export type TOrder = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  orderedProducts: TOrderedProduct[];
  paid: boolean;
  paymentMethod: string;
  status?: 'Order placed' | 'Order processing' | 'Delivered';
};
