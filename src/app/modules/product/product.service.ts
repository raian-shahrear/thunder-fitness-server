import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { CategoryModel } from '../productCategory/productCategory.model';
import { ProductModel } from './product.model';
import mongoose from 'mongoose';
import { TProduct } from './product.interface';
import QueryBuilder from '../../builder/QueryBuilder';

// create a product
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

// get all products
const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productSearchableFields = ['name'];

  const productQuery = new QueryBuilder(
    ProductModel.find().populate('category'),
    query,
  )
    .search(productSearchableFields)
    .filter()
    .sort()
    .paginate();

  const result = await productQuery.queryModel;
  return result;
};

// get single product
const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findById(id).populate('category');
  return result;
};

// get products by category
const getProductsByCategoryFromDB = async (
  id: string,
  query: Record<string, unknown>,
) => {
  const productSearchableFields = ['name'];
  const productQuery = new QueryBuilder(
    ProductModel.find({ category: id }).populate('category'),
    query,
  )
    .search(productSearchableFields)
    .filter()
    .sort()
    .paginate();
  const result = await productQuery.queryModel;
  return result;
};

// delete a product
const deleteProductFromDB = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  return result;
};

// update a product
const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  const result = await ProductModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  getProductsByCategoryFromDB,
  deleteProductFromDB,
  updateProductIntoDB,
};
