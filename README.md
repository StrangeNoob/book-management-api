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

Cyclic allows you to deploy your Node.js applications directly from your GitHub repository. Here's how to deploy your project to Cyclic:

1. Create an account on [Cyclic](https://www.cyclic.sh/).

2. Once logged in, click on the "New App" button.

3. Connect your GitHub account to Cyclic if you haven't done so already.

4. Select the repository containing your book management API project.

5. Choose the branch you want to deploy.

6. Configure environment variables (such as `DB_URI`, `PORT`, and any other required by your application) in the settings of your Cyclic app.

7. Click the "Deploy" button to deploy your application.

8. Cyclic will automatically build and deploy your application, providing you with a unique URL to access your live API.

Remember to check the "Environment Variables" section in your Cyclic dashboard to set up all necessary keys and values that your application requires.

## Monitoring and Logs

After deployment, you can monitor your application and view logs directly from the Cyclic dashboard. This can help you troubleshoot any issues that arise during deployment or runtime.

## Documentation

API documentation is available at http://localhost:3000/docs when the server is running locally.
The Swagger UI provides an interface to interact with the API.
