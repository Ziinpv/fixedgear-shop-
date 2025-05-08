# FixedGear Shop - E-commerce Website

A modern e-commerce website for selling FixedGear bicycles, built with Node.js, Express, MongoDB, and Tailwind CSS.

## Features

- User authentication (register, login, logout)
- Product browsing with filters (price, color, size)
- Shopping cart management
- Secure payment processing with Stripe
- Order management
- Admin dashboard
- Email notifications
- Responsive design with Tailwind CSS

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Stripe API for payments
- Nodemailer for emails
- Cloudinary for image storage

### Frontend
- React.js
- Tailwind CSS
- Axios for API calls
- React Router for navigation
- React Query for data fetching

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Stripe account
- Cloudinary account
- Gmail account for sending emails

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fixedgear-shop
JWT_SECRET=your_jwt_secret_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/fixedgear-shop.git
cd fixedgear-shop
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
```

4. Start the development server:
```bash
# Start backend server
npm run dev

# In a new terminal, start frontend server
cd client
npm start
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user
- POST /api/auth/logout - Logout user

### Products
- GET /api/products - Get all products with filters
- GET /api/products/:id - Get single product
- POST /api/products - Create product (admin only)
- PUT /api/products/:id - Update product (admin only)
- DELETE /api/products/:id - Delete product (admin only)

### Cart
- GET /api/cart - Get user's cart
- POST /api/cart/items - Add item to cart
- PUT /api/cart/items/:itemId - Update cart item quantity
- DELETE /api/cart/items/:itemId - Remove item from cart
- DELETE /api/cart - Clear cart

### Orders
- POST /api/orders - Create order
- GET /api/orders/my-orders - Get user's orders
- GET /api/orders/:id - Get single order
- PUT /api/orders/:id/status - Update order status (admin only)
- GET /api/orders - Get all orders (admin only)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 