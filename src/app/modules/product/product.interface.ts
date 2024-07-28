import { Types } from 'mongoose';

export type TProduct = {
  category: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  isFeaturedProduct?: boolean;
};
