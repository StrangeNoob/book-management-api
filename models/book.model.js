const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A book must have a title"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "A book must have an author"],
      trim: true,
    },
    summary: {
      type: String,
      required: [true, "A book must have a summary"],
      trim: true,
    },
  },
  {
    timestamps: true, // To add createdAt and updatedAt timestamps
  }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
