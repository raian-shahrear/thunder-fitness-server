import { CategoryModel } from './productCategory.model';

const getAllCategoriesFromDB = async () => {
  const result = await CategoryModel.find();
  return result;
};

export const CategoryServices = {
  getAllCategoriesFromDB,
};
