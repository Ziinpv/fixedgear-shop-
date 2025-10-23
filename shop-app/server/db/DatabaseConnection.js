const path = require('path');
const Database = require('better-sqlite3');

/**
 * DatabaseConnection is implemented as a Singleton to guarantee that
 * the entire application shares ONE single database connection.
 *
 * Why Singleton here?
 * - Opening many SQLite connections can cause file locks and SQLITE_BUSY errors.
 * - Reusing one connection avoids repeated connection overhead and reduces memory usage.
 * - Centralizes initialization (PRAGMA, schema creation, seeding) in one place.
 *
 * This pattern improves performance and reliability for a small app like this,
 * where we do not need a connection pool.
 */
class DatabaseConnection {
  static getInstance() {
    if (!DatabaseConnection.instance) {
      const dbFilePath = path.join(__dirname, 'shop.db');
      const db = new Database(dbFilePath);

      // Recommended pragmas for better reliability and performance in small apps
      db.pragma('journal_mode = WAL');
      db.pragma('foreign_keys = ON');

      DatabaseConnection.#initializeSchema(db);
      DatabaseConnection.instance = db;
    }
    return DatabaseConnection.instance;
  }

  /**
   * Create schema and seed data if empty. Runs only once on first connection.
   */
  static #initializeSchema(db) {
    db.exec(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL CHECK(price >= 0),
        image TEXT
      );
      CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
    `);

    const { count } = db.prepare('SELECT COUNT(*) as count FROM products').get();
    if (count === 0) {
      const insert = db.prepare(
        'INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)'
      );
      const seedProducts = [
        ['Áo thun nam', 'Áo thun cotton 100%, form regular', 149000, '/images/tshirt.jpg'],
        ['Quần jean', 'Quần jean xanh đậm, unisex', 399000, '/images/jeans.jpg'],
        ['Giày thể thao', 'Đế êm, nhẹ, thoáng khí', 599000, '/images/shoes.jpg'],
        ['Balo laptop', 'Chống sốc, 15.6 inch', 299000, '/images/backpack.jpg']
      ];
      const trx = db.transaction((rows) => {
        for (const row of rows) insert.run(...row);
      });
      trx(seedProducts);
    }
  }
}

module.exports = DatabaseConnection;
