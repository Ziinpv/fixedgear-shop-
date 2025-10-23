const path = require('path');
const express = require('express');
const session = require('express-session');
const productRoutes = require('./routes/productRoutes');
require('./db/DatabaseConnection').getInstance();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(
  session({
    secret: 'shop-app-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
  })
);

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, '..', 'public')));

// API routes
app.use('/api', productRoutes);

// Cart endpoints (in-session cart for demo)
app.post('/api/cart/add', (req, res) => {
  const { id, name, price, quantity } = req.body || {};
  if (!id || !name || price === undefined) {
    return res.status(400).json({ message: 'Thiếu id, name hoặc price' });
  }
  const qty = Number(quantity) > 0 ? Number(quantity) : 1;

  if (!req.session.cart) req.session.cart = [];
  const idx = req.session.cart.findIndex((item) => item.id === Number(id));
  if (idx >= 0) {
    req.session.cart[idx].quantity += qty;
  } else {
    req.session.cart.push({ id: Number(id), name, price: Number(price), quantity: qty });
  }
  res.json({ ok: true, cart: req.session.cart });
});

app.get('/api/cart', (req, res) => {
  res.json({ cart: req.session.cart || [] });
});

app.post('/api/cart/clear', (req, res) => {
  req.session.cart = [];
  res.json({ ok: true, cart: [] });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
