import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { CategoryModel } from '../productCategory/productCategory.model';
import { ProductModel } from './product.model';
import mongoose from 'mongoose';

const createProductIntoDB = async (
  categoryName: string,
  payload: Record<string, unknown>,
) => {
  const categoryObj: Record<string, unknown> = {
    name: categoryName,
  };

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const isCategoryExist = await CategoryModel.findOne({ name: categoryName });
    if (!isCategoryExist) {
      const newCategory = await CategoryModel.create([categoryObj], {
        session,
      });
      if (!newCategory.length) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to create a new category!',
        );
      }
      payload.category = newCategory[0]._id;
    } else {
      payload.category = isCategoryExist._id;
    }

    const newProduct = await ProductModel.create([payload], { session });
    if (!newProduct.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create a new product!',
      );
    }

    await session.commitTransaction();
    await session.endSession();
    return newProduct;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, `error: ${err}`);
  }
};

export const ProductServices = {
  createProductIntoDB,
};
