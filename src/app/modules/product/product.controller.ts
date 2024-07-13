import httpStatus from 'http-status';
import { ProductServices } from './product.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// create a product
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

// get all products
const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductsFromDB(req.query);
  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Products are retrieved successfully!',
    data: result,
  });
});

// get single product
const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.getSingleProductFromDB(id);
  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Product is retrieved successfully!',
    data: result,
  });
});

// get produts by category
const getProductsByCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const result = await ProductServices.getProductsByCategoryFromDB(
    categoryId,
    req.query,
  );
  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Products are retrieved by category successfully!',
    data: result,
  });
});

// delete a product
const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.deleteProductFromDB(id);
  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Product is deleted successfully!',
    data: result,
  });
});

// update a product
const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.updateProductIntoDB(id, req.body);
  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Product is updated successfully!',
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  getProductsByCategory,
  deleteProduct,
  updateProduct,
};
