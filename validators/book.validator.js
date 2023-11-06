const joi = require("joi");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const mongoose = require("mongoose");

const createBookValidation = (req, res, next) => {
  const schema = joi.object({
    title: joi
      .string()
      .required()
      .error(new ApiError(httpStatus.BAD_REQUEST, "Title is required")),
    author: joi
      .string()
      .required()
      .error(new ApiError(httpStatus.BAD_REQUEST, "Author is required")),

    summary: joi
      .string()
      .required()
      .error(new ApiError(httpStatus.BAD_REQUEST, "Summary is required")),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    if (typeof error == ApiError) {
      throw error;
    }
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }

  return next();
};

const updateBookValidation = (req, res, next) => {
  const schema = joi.object({
    title: joi
      .string()
      .optional()
      .error(new ApiError(httpStatus.BAD_REQUEST, "Title is required")),

    author: joi
      .string()
      .optional()
      .error(new ApiError(httpStatus.BAD_REQUEST, "Title is required")),

    summary: joi
      .string()
      .optional()
      .error(new ApiError(httpStatus.BAD_REQUEST, "Title is required")),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    if (typeof error == ApiError) {
      throw error;
    }
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }

  return next();
};

const paramIdBookValidation = (req, res, next) => {
  const schema = joi.object({
    bookId: joi
      .string()
      .required()
      .error(new ApiError(httpStatus.BAD_REQUEST, "BookId is required")),
  });

  const { error } = schema.validate({
    bookId: req.params.bookId,
  });

  if (error) {
    if (typeof error == ApiError) {
      throw error;
    }
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }

  const isValidParam = mongoose.Types.ObjectId.isValid(req.params.bookId);
  if (!isValidParam) {
    throw new ApiError(httpStatus.BAD_REQUEST, "BookId is invalid");
  }
  return next();
};

module.exports = {
  createBookValidation,
  updateBookValidation,
  paramIdBookValidation,
};
