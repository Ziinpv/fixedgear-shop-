const DatabaseConnection = require('../db/DatabaseConnection');

const db = DatabaseConnection.getInstance();

const ProductModel = {
  getAll() {
    return db.prepare(
      'SELECT id, name, description, price, image FROM products ORDER BY id DESC'
    ).all();
  },

  getById(id) {
    return db.prepare(
      'SELECT id, name, description, price, image FROM products WHERE id = ?'
    ).get(id);
  },

  create({ name, description, price, image }) {
    const info = db
      .prepare(
        'INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)'
      )
      .run(name, description || '', Number(price), image || '');
    return {
      id: Number(info.lastInsertRowid),
      name,
      description: description || '',
      price: Number(price),
      image: image || ''
    };
  },

  update(id, { name, description, price, image }) {
    const info = db
      .prepare(
        'UPDATE products SET name = ?, description = ?, price = ?, image = ? WHERE id = ?'
      )
      .run(name, description || '', Number(price), image || '', id);
    return info.changes > 0;
  },

  remove(id) {
    const info = db.prepare('DELETE FROM products WHERE id = ?').run(id);
    return info.changes > 0;
  }
};

module.exports = ProductModel;
