import httpStatus from 'http-status';
import { ProductServices } from './product.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createProduct = catchAsync(async (req, res) => {
  const { category, product } = req.body;
  const result = await ProductServices.createProductIntoDB(category, product);
  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Product is created successfully!',
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
};
