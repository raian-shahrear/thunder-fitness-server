import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { CategoryModel } from '../productCategory/productCategory.model';
import { ProductModel } from './product.model';
import { TProduct } from './product.interface';
import QueryBuilder from '../../builder/QueryBuilder';

// create a product
const createProductIntoDB = async (payload: TProduct) => {
  const isCategoryExist = await CategoryModel.findById(payload.category);
  if (!isCategoryExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category is not existed!');
  }

  const result = await ProductModel.create(payload);
  return result;
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
