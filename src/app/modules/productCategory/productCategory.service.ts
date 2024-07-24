import { TCategory } from './productCategory.interface';
import { CategoryModel } from './productCategory.model';

// create a category
const createCategoryFromDB = async (payload: TCategory) => {
  const result = await CategoryModel.create(payload);
  return result;
};

// get all category
const getAllCategoriesFromDB = async () => {
  const result = await CategoryModel.find();
  return result;
};

export const CategoryServices = {
  getAllCategoriesFromDB,
  createCategoryFromDB,
};
