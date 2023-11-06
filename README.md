# Book Management API

This project is a RESTful API for managing books, built with Node.js and MongoDB. It allows for CRUD operations on books, including adding new books, viewing all books, retrieving details of a specific book, updating book details, and deleting books.

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v14.x or later)
- npm (comes with Node.js)
- MongoDB (local setup or a MongoDB Atlas account)

## Installation

Follow these steps to install the project:

1. Clone the repository:

```bash
git clone https://github.com/your-username/book-management-api.git
cd book-management-api
```

2. Install the dependencies:

```bash
npm install
```

3. Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

4. Edit the `.env` file and add your MongoDB connection string:

```bash
vim .env
```

5. Run the project:

```bash
npm start
```

The API should now be running on http://localhost:3000.

## Testing

To run the tests, run the following command:

```bash
npm test
```

The tests are written using Jest and Supertest.
To add a new test case, create a .spec.js file in the **tests** directory.
Use the existing test cases as a template for writing your tests.

## Deployment to Cyclic

To deploy the project to Cyclic, follow these steps:

1. Create an account on Cyclic.

2. Install the Cyclic CLI tool:

```bash
npm install -g cyclic-cli
```

3. Log in to your Cyclic account using the CLI:

```bash
cyclic login
```

4. Deploy the application:

```bash
cyclic deploy
```

Follow the prompts to select the repository and branch you wish to deploy.

Once deployed, Cyclic will provide a URL to access your live API.

## Documentation

API documentation is available at http://localhost:3000/docs when the server is running locally.
The Swagger UI provides an interface to interact with the API.
