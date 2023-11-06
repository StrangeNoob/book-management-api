const express = require("express");

const router = express.Router();

const { bookController } = require("../controllers");
const { bookValidator } = require("../validators");

router
  .route("/")
  .get(bookController.getBooks)
  .post(bookValidator.createBookValidation, bookController.createBook);

router
  .route("/:bookId")
  .get(bookValidator.paramIdBookValidation, bookController.getBook)
  .put(
    bookValidator.paramIdBookValidation,
    bookValidator.updateBookValidation,
    bookController.updateBook
  )
  .delete(bookValidator.paramIdBookValidation, bookController.deleteBook);

module.exports = router;
