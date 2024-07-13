import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = httpStatus.BAD_REQUEST;
  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  };
};

export default handleCastError;
