import express from 'express';
import { CategoryControllers } from './productCategory.controller';

const router = express.Router();

router.get('/', CategoryControllers.getAllCategories);

export const CategoryRoutes = router;
