import mongoose from 'mongoose';
import { ProductModel } from '../product/product.model';
import { TOrder } from './order.interface';
import { OrderModel } from './order.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

// create/place an order
const createOrderIntoDB = async (payload: TOrder) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    for (const orderedProduct of payload.orderedProducts) {
      const product = await ProductModel.findById(orderedProduct.product);
      if (!product) {
        throw new AppError(httpStatus.NOT_FOUND, `Product is not found!`);
      }
      if (product.stock < orderedProduct.quantity) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `Insufficient stock for the ${product.name}!`,
        );
      }

      const updateProduct = await ProductModel.findByIdAndUpdate(
        orderedProduct.product,
        { $inc: { stock: -orderedProduct.quantity } },
        { new: true, session },
      );
      if (!updateProduct) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to place an order!');
      }
    }

    const newOrder = await OrderModel.create([payload], { session });
    if (!newOrder.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to place an order!');
    }

    await session.commitTransaction();
    await session.endSession();
    return newOrder;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, `error: ${err}`);
  }
};

// get all orders
const getAllOrdersFromDB = async () => {
  const result = await OrderModel.find().populate({
    path: 'orderedProducts',
    populate: {
      path: 'product',
    },
  });
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
