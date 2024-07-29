# Thunder Fitness Server
###### Live Server: [thunder-fitness-server](https://thunder-fitness-server.vercel.app)

## Important API:
1. Create a product: /api/v1/products (POST)
2. Get all products: /api/v1/products (GET)
3. Get single product: /api/v1/products/:id (GET)
4. Get products by category: /api/v1/products/by-category/:categoryId (GET)
5. Update a product: /api/v1/products/:id (PATCH)
6. Delete a product: /api/v1/products/:id (DELETE)
-----------------------------------------------------
7. Get all categories: /api/v1/categories (GET)
-----------------------------------------------------
8. Create an order: /api/v1/orders (POST)
9. Get all orders: /api/v1/orders (GET)

## Configuration
1. Create a `.env` file in the root directory of the project.
2. Add necessary configuration variables in the `.env` file.
   Example:
   ```bash
    NODE_ENV=development
    PORT=5000
    DATABASE_URL=database_url
   ```
3. Then the `.env` file needs to be connected with the `config`.
   ```js
    import dotenv from 'dotenv';
    import path from 'path';

    dotenv.config({ path: path.join(process.cwd(), '.env') });
    export default {
        NODE_ENV: process.env.NODE_ENV,
        port: process.env.PORT,
        db_url: process.env.DATABASE_URL,
    };
   ```