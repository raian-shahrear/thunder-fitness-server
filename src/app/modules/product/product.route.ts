import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidations } from './product.validation';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(ProductValidations.createProductValidationSchema),
  ProductControllers.createProduct,
);
router.get('/', ProductControllers.getAllProducts);
router.get('/:id', ProductControllers.getSingleProduct);
router.get(
  '/by-category/:categoryId',
  ProductControllers.getProductsByCategory,
);
router.delete('/:id', ProductControllers.deleteProduct);
router.patch(
  '/:id',
  validateRequest(ProductValidations.updateProductValidationSchema),
  ProductControllers.updateProduct,
);

export const ProductRoutes = router;
