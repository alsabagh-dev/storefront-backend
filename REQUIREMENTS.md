# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index                     '/products/'    [GET]
- Show                      '/products/:id' [GET]
- Create [token required]   '/products/'    [POST]
- [OPTIONAL] Top 5 most popular products '/products/popular/:limit/'    [GET]
- [OPTIONAL] Products by category (args: product category) '/products/categories/'    [GET]

#### Users
- Index [token required]    '/users/'    [GET]
- Show [token required]     '/users/:id' [GET]
- Create [token required]  '/users/'    [POST]

#### Orders
- Current Order by user (args: user id)[token required]     '/orders/:user_id'    [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required] '/orders/:user_id/completed'    [GET]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete) false = active, true == completed


## DB tables

#### Products
Table: Products (id:serial, name:varchar, price:decimal)

#### Users
Table: Users (id:serial, firstName:varchar, lastName:varchar, password:text)

#### Orders
Table: Orders (id:serial, status:boolean, user_id:bigint[foreign key to Users table])

#### Order_products
Table: Order_products (id:serial,  quantity: integer, order_id:bigint[foreign key to Orders table],  product_id:bigint[foreign key to Products table])
