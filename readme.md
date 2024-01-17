<!-- NOTE: modify this file based on your project specifications-->

## E-COMMERCE API DOCUMENTATION

***INSTALLATION COMMAND:***

```npm install```

***TEST ACCOUNTS:***
- Regular User:
     - email: Joyboy@gmail.com
     - pwd: Joyboy
- Admin User:
    - email: Admin@gmail.com
    - pwd: Admin123
    

***ROUTES:***

<!-- USER ROUTES -->

- Check email Exist (POST)
    - http://localhost:3000/users/check
    - auth header required: NO
    - request body: 
        - email (string)

- Register User (POST)
	- http://localhost:3000/users/register
    - auth header required: NO
    - request body: 
        - firstName (string)
        - lastName (string)
        - email (string)
        - mobileNo (string)
        - password (string)
       
- Login User (POST)
	- http://localhost:3000/users/login
    - auth header required: NO
    - request body: 
        - email (string)
        - password (string)

- Retrieve User Details (GET)
	- http://localhost:3000/users/details
    - auth header required: YES
    - request body: 
        - id (ObjectId)

- Set User as Admin (Admin Only) (PUT)
	- http://localhost:3000/users/updateStatus
    - auth header required: YES
	- request body: 
        - id (ObjectId)

<!-- PRODUCT ROUTES -->


- Create Product (Admin Only) (POST)
    - http://localhost:3000/products/create
    - auth header required: YES
    - request body: 
        - name (string) 
        - description (string)
        - brand (string)
        - price (number)

- Retrieve All Products (GET)
    - http://localhost:3000/products/allProducts
    - auth header required: NO
    - request body: none

- Retrieve All Active Products (GET)
    - http://localhost:3000/products/activeProducts
    - auth header required: NO
    - request body: none

- Retrieve a Single Product (GET)
    - http://localhost:3000/products/:productId
    - auth header required: NO
    - request body: none
    - parameters: YES

- Updating a Product (Admin Only) (PUT)
    - http://localhost:3000/products/:productId/update
    - auth header required: YES
    - request body: 
        - name (string) 
        - description (string)
        - brand (string)
        - price (number)

- Archiving a Product (Admin Only) (PUT)
    - http://localhost:3000/products/productId:/archive
    - auth header required: YES
    - request body: none


- Activating a Product (Admin Only) (PUT)
    - http://localhost:3000/products/productId:/activate
    - auth header required: YES
    - request body: none

<!-- PRODUCT ROUTES -->

- Create Order (POST)
    - http://localhost:3000/orders/create
    - auth header require: YES
    - request body:
        - userId (ObjectId)
        - products: (Array of Objects)
            - productId (ObjectId)
            - quantity (number)

- Retrieve User's Order (GET)
    - http://localhost:3000/orders/retrieveOrders
    - auth header required: YES
    - request body: none

- Retrieve All Orders (Admin Only) (GET)
    - http://localhost:3000/orders/retrieveOrders
    - auth header required: YES
    - request body: none

<!-- CART ROUTES -->

- Add product to cart (POST)
    - http://localhost:3000/carts/add
    - auth header require: NO
    - request body:
        - userId (ObjectId)
        - productId (ObjectId)
        - quantity (number)

- Remove product to cart (DELETE)
    - http://localhost:3000/carts/remove
    - auth header required: NO
    - request body: 
        - userId (ObjectId)
        - productId (ObjectId)

- Calculate total of the cart (GET)
    - http://localhost:3000/carts/calculateTotal
    - auth header required: NO
    - request body: 
        - userId (ObjectId)


















