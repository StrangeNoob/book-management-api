const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { Book } = require("../models");
const mongoose = require("mongoose");

const createBook = async (bookBody) => {
  const book = await Book.create(bookBody);
  return book;
};

const queryBooks = async () => {
  const books = await Book.find();
  return books;
};

const getBookById = async (bookId) => {
  const book = await Book.findOne({ _id: new mongoose.Types.ObjectId(bookId) });
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
  }
  return book;
};
const updateBookById = async (bookId, updateBody) => {
  const book = await Book.findOne({ _id: new mongoose.Types.ObjectId(bookId) });
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
  }
  const updatedBook = await Book.findOneAndUpdate(
    { _id: book._id },
    {
      $set: {
        ...updateBody,
      },
    },
    { new: true }
  );
  return updatedBook;
};

const deleteBookById = async (bookId) => {
  const book = await Book.findOne({ _id: new mongoose.Types.ObjectId(bookId) });
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
  }
  await book.remove();
  return book;
};

module.exports = {
  createBook,
  queryBooks,
  getBookById,
  updateBookById,
  deleteBookById,
};
