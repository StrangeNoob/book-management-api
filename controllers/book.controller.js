const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { bookService } = require("../services");

const createBook = catchAsync(async (req, res) => {
  const book = await bookService.createBook(req.body);
  return res.status(httpStatus.CREATED).send(book);
});

const getBooks = catchAsync(async (req, res) => {
  const result = await bookService.queryBooks();
  res.status(httpStatus.OK).send(result);
});

const getBook = catchAsync(async (req, res) => {
  const book = await bookService.getBookById(req.params.bookId);
  return res.status(httpStatus.OK).send(book);
});

const updateBook = catchAsync(async (req, res) => {
  const book = await bookService.updateBookById(req.params.bookId, req.body);
  return res.status(httpStatus.OK).send(book);
});

const deleteBook = catchAsync(async (req, res) => {
  await bookService.deleteBookById(req.params.bookId);
  return res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
};
