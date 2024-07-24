import { model, Schema } from 'mongoose';
import { TCategory } from './productCategory.interface';

const categorySchema = new Schema<TCategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const CategoryModel = model<TCategory>('Category', categorySchema);
