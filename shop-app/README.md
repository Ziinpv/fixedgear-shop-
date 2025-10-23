# Online Shop (Node.js + Express + SQLite)

Một website bán hàng đơn giản gồm backend (Express) và frontend thuần (HTML/CSS/JS).

## Kiến trúc

- server/: Express + SQLite (better-sqlite3)
  - db/DatabaseConnection.js: Singleton quản lý 1 kết nối SQLite duy nhất và seed dữ liệu
  - models/productModel.js: Tầng truy cập dữ liệu (DAO)
  - controllers/productController.js: Xử lý nghiệp vụ/response
  - routes/productRoutes.js: Định nghĩa endpoint
  - app.js: Khởi tạo app, session cart, serve static frontend
- public/: HTML/CSS/JS thuần cho UI

## Vì sao dùng Singleton cho DatabaseConnection?

- Tránh mở nhiều kết nối tới SQLite dẫn tới lock file hoặc lỗi `SQLITE_BUSY`.
- Tối ưu hiệu năng: khởi tạo connection, PRAGMA, schema và seed chỉ một lần.
- Trung tâm hóa việc cấu hình DB, tiện cho bảo trì và mở rộng.

## API chính

- GET `/api/products`: Danh sách sản phẩm
- GET `/api/products/:id`: Chi tiết sản phẩm
- POST `/api/cart/add`: Thêm sản phẩm vào giỏ (lưu trong session)
- GET `/api/cart`: Lấy giỏ hàng hiện tại
- POST `/api/cart/clear`: Xóa giỏ hàng

Ngoài ra có thêm các endpoint quản trị cơ bản (demo, chưa có auth):
- POST `/api/products`
- PUT `/api/products/:id`
- DELETE `/api/products/:id`

## Chạy dự án

Yêu cầu Node.js >= 18.

```bash
cd server
npm install
npm start
```

Mặc định server chạy tại `http://localhost:3000` và phục vụ static file trong `public/`.

- Trang chủ: `http://localhost:3000/index.html`
- Chi tiết sản phẩm: `http://localhost:3000/product.html?id=1`
- Giỏ hàng: `http://localhost:3000/cart.html`

## Ghi chú

- DB đặt tại `server/db/shop.db` (tự tạo khi chạy lần đầu), dữ liệu mẫu được seed tự động.
- Sử dụng `better-sqlite3` (đồng bộ, đơn giản, hiệu năng tốt cho app nhỏ).
- Có thể thay SQLite bằng MySQL bằng cách implement `DatabaseConnection` khác giữ nguyên interface.
