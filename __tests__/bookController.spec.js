const request = require("supertest");
const dotenv = require("dotenv");
const app = require("../app");
const mongoose = require("mongoose");
const { Book } = require("../models");

describe("Book API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Book.deleteMany();
  });

  describe("POST /books", () => {
    it("should create a book with valid title, author, and summary", async () => {
      const res = await request(app).post("/books").send({
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        summary: "A novel about the decadence of the Jazz Age",
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("_id");
      expect(res.body.title).toEqual("The Great Gatsby");
      expect(res.body.author).toEqual("F. Scott Fitzgerald");
      expect(res.body.summary).toEqual(
        "A novel about the decadence of the Jazz Age"
      );
    });

    it("should not create a book with a missing title", async () => {
      const res = await request(app).post("/books").send({
        author: "F. Scott Fitzgerald",
        summary: "A novel about the decadence of the Jazz Age",
      });
      expect(res.statusCode).toEqual(400);
    });

    it("should not create a book with a missing author", async () => {
      const res = await request(app).post("/books").send({
        title: "The Great Gatsby",
        summary: "A novel about the decadence of the Jazz Age",
      });
      expect(res.statusCode).toEqual(400);
    });

    it("should not create a book with a missing summary", async () => {
      const res = await request(app).post("/books").send({
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
      });
      expect(res.statusCode).toEqual(400);
    });

    it("should not create a book with an empty title", async () => {
      const res = await request(app).post("/books").send({
        title: "",
        author: "F. Scott Fitzgerald",
        summary: "A novel about the decadence of the Jazz Age",
      });
      expect(res.statusCode).toEqual(400);
    });

    it("should not create a book with an empty author", async () => {
      const res = await request(app).post("/books").send({
        title: "The Great Gatsby",
        author: "",
        summary: "A novel about the decadence of the Jazz Age",
      });
      expect(res.statusCode).toEqual(400);
    });

    it("should not create a book with an empty summary", async () => {
      const res = await request(app).post("/books").send({
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        summary: "",
      });
      expect(res.statusCode).toEqual(400);
    });

    it("should create a book with the same title and author as an existing book", async () => {
      await request(app).post("/books").send({
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        summary: "A novel about the decadence of the Jazz Age",
      });
      const res = await request(app).post("/books").send({
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        summary: "A different novel about the decadence of the Jazz Age",
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("_id");
      expect(res.body.title).toEqual("The Great Gatsby");
      expect(res.body.author).toEqual("F. Scott Fitzgerald");
      expect(res.body.summary).toEqual(
        "A different novel about the decadence of the Jazz Age"
      );
    });
  });

  describe("GET /books", () => {
    it("should retrieve a list of all books", async () => {
      await request(app).post("/books").send({
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        summary: "A novel about the decadence of the Jazz Age",
      });
      await request(app).post("/books").send({
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        summary: "A novel about racism in the American South",
      });
      const res = await request(app).get("/books");
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toEqual(2);
      expect(res.body[0].title).toEqual("The Great Gatsby");
      expect(res.body[1].title).toEqual("To Kill a Mockingbird");
    });

    it("should retrieve a list of all books when there are no books", async () => {
      const res = await request(app).get("/books");
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toEqual(0);
    });
  });

  describe("GET /books/:bookId", () => {
    it("should retrieve a single book by valid ID", async () => {
      const book = await request(app).post("/books").send({
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        summary: "A novel about the decadence of the Jazz Age",
      });
      const res = await request(app).get(`/books/${book.body._id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toEqual("The Great Gatsby");
      expect(res.body.author).toEqual("F. Scott Fitzgerald");
      expect(res.body.summary).toEqual(
        "A novel about the decadence of the Jazz Age"
      );
    });

    it("should not retrieve a book with an invalid ID format", async () => {
      const res = await request(app).get("/books/invalidId");
      expect(res.statusCode).toEqual(400);
    });

    it("should not retrieve a book with a non-existent ID", async () => {
      const res = await request(app).get("/books/123456789012345678901234");
      expect(res.statusCode).toEqual(404);
    });
  });

  describe("PUT /books/:bookId", () => {
    it("should update a book's title, author, and summary with valid values", async () => {
      const book = await request(app).post("/books").send({
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        summary: "A novel about the decadence of the Jazz Age",
      });
      const res = await request(app).put(`/books/${book.body._id}`).send({
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        summary: "A novel about teenage angst",
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toEqual("The Catcher in the Rye");
      expect(res.body.author).toEqual("J.D. Salinger");
      expect(res.body.summary).toEqual("A novel about teenage angst");
    });

    it("should update a book without missing title", async () => {
      const book = await request(app).post("/books").send({
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        summary: "A novel about the decadence of the Jazz Age",
      });
      const res = await request(app).put(`/books/${book.body._id}`).send({
        author: "J.D. Salinger",
        summary: "A novel about teenage angst",
      });
      expect(res.statusCode).toEqual(200);
    });

    it("should update a book with a missing author", async () => {
      const book = await request(app).post("/books").send({
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        summary: "A novel about the decadence of the Jazz Age",
      });
      const res = await request(app).put(`/books/${book.body._id}`).send({
        title: "The Catcher in the Rye",
        summary: "A novel about teenage angst",
      });
      expect(res.statusCode).toEqual(200);
    });

    it("should update a book with a missing summary", async () => {
      const book = await request(app).post("/books").send({
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        summary: "A novel about the decadence of the Jazz Age",
      });
      const res = await request(app).put(`/books/${book.body._id}`).send({
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
      });
      expect(res.statusCode).toEqual(200);
    });

    it("should not update a book with an empty title", async () => {
      const book = await request(app).post("/books").send({
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        summary: "A novel about the decadence of the Jazz Age",
      });
      const res = await request(app).put(`/books/${book.body._id}`).send({
        title: "",
        author: "J.D. Salinger",
        summary: "A novel about teenage angst",
      });
      expect(res.statusCode).toEqual(400);
    });

    it("should not update a book with an empty author", async () => {
      const book = await request(app).post("/books").send({
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        summary: "A novel about the decadence of the Jazz Age",
      });
      const res = await request(app).put(`/books/${book.body._id}`).send({
        title: "The Catcher in the Rye",
        author: "",
        summary: "A novel about teenage angst",
      });
      expect(res.statusCode).toEqual(400);
    });

    it("should not update a book with an empty summary", async () => {
      const book = await request(app).post("/books").send({
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        summary: "A novel about the decadence of the Jazz Age",
      });
      const res = await request(app).put(`/books/${book.body._id}`).send({
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        summary: "",
      });
      expect(res.statusCode).toEqual(400);
    });

    it("should not update a book with a non-existent ID", async () => {
      const res = await request(app)
        .put("/books/123456789012345678901234")
        .send({
          title: "The Catcher in the Rye",
          author: "J.D. Salinger",
          summary: "A novel about teenage angst",
        });
      expect(res.statusCode).toEqual(404);
    });

    it("should not update a book with an invalid ID format", async () => {
      const res = await request(app).put("/books/invalidId").send({
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        summary: "A novel about teenage angst",
      });
      expect(res.statusCode).toEqual(400);
    });
  });

  describe("DELETE /books/:bookId", () => {
    it("should delete a book with a valid ID", async () => {
      const book = await request(app).post("/books").send({
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        summary: "A novel about the decadence of the Jazz Age",
      });
      const res = await request(app).delete(`/books/${book.body._id}`);
      expect(res.statusCode).toEqual(204);
    });

    it("should not delete a book with a non-existent ID", async () => {
      const res = await request(app).delete("/books/123456789012345678901234");
      expect(res.statusCode).toEqual(404);
    });

    it("should not delete a book with an invalid ID format", async () => {
      const res = await request(app).delete("/books/invalidId");
      expect(res.statusCode).toEqual(400);
    });
  });
});
