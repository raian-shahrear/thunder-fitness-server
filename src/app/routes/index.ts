import express from 'express';
import { ProductRoutes } from '../modules/product/product.route';
import { CategoryRoutes } from '../modules/productCategory/productCategory.route';
import { OrderRoutes } from '../modules/order/order.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
];

moduleRoutes.forEach((r) => router.use(r.path, r.route));

export default router;
