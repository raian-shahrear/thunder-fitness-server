import express from 'express';
import { CategoryControllers } from './productCategory.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidations } from './productCategory.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(CategoryValidations.createCategoryValidationSchema),
  CategoryControllers.createCategory,
);
router.get('/', CategoryControllers.getAllCategories);

export const CategoryRoutes = router;
