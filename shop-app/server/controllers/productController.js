const Product = require('../models/productModel');

exports.getProducts = (req, res) => {
  const products = Product.getAll();
  res.json(products);
};

exports.getProductById = (req, res) => {
  const id = Number(req.params.id);
  const product = Product.getById(id);
  if (!product) return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
  res.json(product);
};

// Optional basic admin endpoints
exports.createProduct = (req, res) => {
  const { name, description, price, image } = req.body || {};
  if (!name || price === undefined) {
    return res.status(400).json({ message: 'Thiếu name hoặc price' });
  }
  const created = Product.create({ name, description, price, image });
  res.status(201).json(created);
};

exports.updateProduct = (req, res) => {
  const id = Number(req.params.id);
  const ok = Product.update(id, req.body || {});
  if (!ok) return res.status(404).json({ message: 'Không cập nhật được sản phẩm' });
  res.json({ ok: true });
};

exports.deleteProduct = (req, res) => {
  const id = Number(req.params.id);
  const ok = Product.remove(id);
  if (!ok) return res.status(404).json({ message: 'Không xoá được sản phẩm' });
  res.json({ ok: true });
};
