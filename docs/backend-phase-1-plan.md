# Kế Hoạch Phase 1 Cho Web Bán Hàng

## Tóm tắt

Xây dựng `backend API trước` trên nền NestJS + Prisma + MySQL, bám đúng convention trong `AGENTS.md`: module theo domain, tách public/admin controller, prefix `/api/v1`, admin bắt buộc `JwtAuthGuard` + `RolesGuard`. Phạm vi MVP của phase này là bán hàng cơ bản với `đăng nhập + COD`, sản phẩm `có biến thể`, một kho, một loại admin nội bộ, chưa làm frontend trong phase này.

Kết quả cần đạt ở cuối phase:

- Có schema Prisma và migration đầu tiên cho toàn bộ domain cốt lõi
- Có public API cho catalog và đặt hàng
- Có admin API cho quản trị sản phẩm, biến thể, danh mục, đơn hàng
- Có seed dữ liệu mẫu, unit test cho logic đơn hàng, e2e test cho luồng chính

## Các quyết định đã khóa

- Scope phase 1: chỉ làm backend API, chưa triển khai storefront/admin web
- Checkout: bắt buộc đăng nhập, thanh toán COD
- Sản phẩm: có biến thể, mỗi biến thể có SKU, giá và tồn kho riêng
- Kho: một kho duy nhất, tồn kho quản lý ở mức biến thể
- Vai trò: `customer` và `admin`
- Không làm trong phase này: voucher, review, online payment, đa kho, đa vendor, wishlist, chat, dashboard nâng cao

## Thiết kế nghiệp vụ và dữ liệu

Triển khai các domain chính trong `backend/src/modules`:

- `auth`: đăng ký, đăng nhập, profile người dùng hiện tại
- `users`: thông tin người dùng, vai trò, trạng thái tài khoản
- `categories`: CRUD danh mục và public listing
- `products`: sản phẩm, biến thể, ảnh, trạng thái hiển thị
- `cart`: giỏ hàng của user đăng nhập
- `orders`: tạo đơn, xem lịch sử đơn, admin cập nhật trạng thái
- `common/admin`: guard, decorator role, response helpers, exception filter cơ bản nếu cần

Thiết kế bảng Prisma trong `backend/prisma/schema.prisma`:

- `User`, `Role` hoặc role enum trong `User`
- `Category`
- `Product`
- `ProductVariant`
- `ProductImage`
- `Cart`
- `CartItem`
- `Order`
- `OrderItem`
- `Address` hoặc snapshot địa chỉ trực tiếp trong `Order`
- `RefreshToken` nếu dùng refresh token; nếu chưa cần thì bỏ

Quy tắc dữ liệu cần áp dụng:

- `Product` là thực thể cha để quản trị nội dung, slug, mô tả, thumbnail
- `ProductVariant` chứa `sku`, `price`, `stock`, `attributeSummary`, `status`
- `OrderItem` phải snapshot tên sản phẩm, SKU, giá tại thời điểm đặt hàng
- `Order` có các trạng thái: `pending`, `confirmed`, `shipping`, `completed`, `cancelled`
- Trừ tồn kho khi tạo đơn thành công; nếu hủy đơn thì cộng trả tồn kho
- Public API chỉ trả sản phẩm `published` và biến thể `active`
- Không trả raw Prisma model trực tiếp; luôn map qua response DTO

## Kế hoạch triển khai theo bước

### Bước 1: Chuẩn hóa nền backend

- Cài Prisma, MySQL driver, `class-validator`, `class-transformer`, JWT và các package auth cần thiết
- Tạo `PrismaModule`, `PrismaService`, cấu hình env và `env.validation.ts`
- Sửa bootstrap trong `src/main.ts`: global prefix `/api/v1`, global validation pipe, CORS theo env
- Xóa starter code mặc định và thay bằng `Health` endpoint tối giản để kiểm tra app sống

### Bước 2: Thiết kế schema và migration đầu tiên

- Viết schema Prisma cho các entity cốt lõi đã chốt
- Tạo enum cho `userRole`, `productStatus`, `variantStatus`, `orderStatus`
- Thêm index cho `slug`, `sku`, `status`, `createdAt`, `categoryId`
- Tạo migration đầu tiên và seed dữ liệu mẫu gồm admin, category, product, variant

### Bước 3: Dựng auth và phân quyền

- Tạo module `auth` với đăng ký, đăng nhập, lấy profile
- Dùng JWT access token; refresh token là tùy chọn nhưng nên thêm ngay nếu muốn dùng lâu dài
- Tạo `JwtAuthGuard`, `RolesGuard`, decorator `@Roles()`
- Tách rõ route:
  - Public: `/api/v1/auth/register`, `/api/v1/auth/login`
  - Admin: route admin của domain khác luôn gắn guard + role

### Bước 4: Xây catalog công khai

- `categories.public.controller`: danh sách danh mục đang active
- `products.public.controller`: danh sách sản phẩm, chi tiết sản phẩm theo slug
- Hỗ trợ filter tối thiểu: category, keyword, sort giá, phân trang
- Response chi tiết sản phẩm phải gồm danh sách biến thể khả dụng, ảnh, giá min/max nếu có nhiều variant
- Chỉ public các field cần cho storefront; ẩn dữ liệu nội bộ như cost, metadata admin

### Bước 5: Xây admin catalog

- `categories.admin.controller`: CRUD danh mục
- `products.admin.controller`: CRUD sản phẩm
- `product-variants.admin.controller` hoặc gộp trong product admin nếu muốn quản lý biến thể cùng sản phẩm
- Admin có thể:
  - tạo sản phẩm cha
  - thêm/sửa/xóa biến thể
  - cập nhật tồn kho
  - publish/unpublish sản phẩm
- Query phức tạp đặt ở repository của từng domain, không đặt trong controller

### Bước 6: Xây giỏ hàng và đặt hàng

- `cart`:
  - lấy giỏ hiện tại
  - thêm item theo `variantId`
  - cập nhật số lượng
  - xóa item
- `orders`:
  - tạo đơn từ giỏ hàng
  - validate tồn kho trước khi chốt
  - snapshot giá/thuộc tính/địa chỉ tại thời điểm đặt
  - xóa hoặc làm rỗng giỏ sau khi tạo đơn
- Public authenticated routes:
  - `GET /api/v1/cart`
  - `POST /api/v1/cart/items`
  - `PATCH /api/v1/cart/items/:id`
  - `DELETE /api/v1/cart/items/:id`
  - `POST /api/v1/orders`
  - `GET /api/v1/orders`
  - `GET /api/v1/orders/:id`

### Bước 7: Xây admin orders

- `orders.admin.controller`: list đơn, xem chi tiết, cập nhật trạng thái
- Cho phép chuyển trạng thái theo flow hợp lệ:
  - `pending -> confirmed`
  - `confirmed -> shipping`
  - `shipping -> completed`
  - `pending|confirmed -> cancelled`
- Khi cancel, hoàn stock cho từng variant
- Ghi log service-level cho các action quan trọng: tạo đơn, đổi trạng thái, cập nhật stock

### Bước 8: Hoàn thiện kỹ thuật và tài liệu

- Seed script rõ ràng để team có thể dựng môi trường nhanh
- README mới cho backend: cách chạy app, migrate, seed, test
- Thêm Postman collection hoặc Swagger là tùy chọn; nếu chỉ chọn một, ưu tiên Swagger để kiểm thử nhanh nội bộ
- Chuẩn hóa lỗi HTTP và response shape ở mức đủ dùng cho frontend phase sau

## API và interface quan trọng cần có

Các DTO/response chính cần được định nghĩa rõ:

- `register.dto`, `login.dto`, `auth-response.dto`
- `create-category.dto`, `update-category.dto`
- `create-product.dto`, `update-product.dto`
- `create-product-variant.dto`, `update-product-variant.dto`
- `add-cart-item.dto`, `update-cart-item.dto`
- `create-order.dto`, `update-order-status.dto`
- `product-list.response.dto`, `product-detail.response.dto`, `order-detail.response.dto`

Các contract cần khóa sớm:

- Product detail trả `variants[]` với `id`, `sku`, `attributes`, `price`, `stock`, `isAvailable`
- Cart item luôn gắn với `variantId`, không gắn trực tiếp với product
- Order create nhận địa chỉ giao hàng snapshot và ghi chú đơn hàng
- Admin list endpoints hỗ trợ `page`, `limit`, `keyword`, `status`

## Test Plan

Unit test bắt buộc:

- tạo đơn thành công với nhiều cart item
- từ chối tạo đơn khi một variant không đủ stock
- hoàn stock khi admin cancel đơn
- tính tổng tiền đúng theo snapshot variant price

E2E test bắt buộc:

- public lấy danh sách sản phẩm published
- customer đăng ký hoặc đăng nhập rồi thêm giỏ
- customer tạo đơn COD từ giỏ hàng
- admin đăng nhập và cập nhật trạng thái đơn
- admin CRUD sản phẩm có biến thể

Kiểm tra chấp nhận cuối phase:

- chạy `build`, `lint`, `test`, `test:e2e` thành công
- migration dựng được DB từ đầu
- seed tạo được admin account và dữ liệu catalog mẫu
- toàn bộ admin route bị chặn nếu không có JWT hoặc không có role `admin`

## Mốc triển khai đề xuất

- Ngày 1: bootstrap nền, env, Prisma, schema nháp
- Ngày 2: migration đầu tiên, seed, auth
- Ngày 3: categories + products public/admin
- Ngày 4: variants + stock + ảnh sản phẩm
- Ngày 5: cart + create order
- Ngày 6: admin orders + status flow + hoàn stock
- Ngày 7: test, README, cleanup, Swagger hoặc API docs

## Giả định và mặc định

- Frontend sẽ dùng phase 2, consume API này mà không yêu cầu thay đổi lớn ở contract
- Ảnh sản phẩm phase đầu có thể lưu URL string; chưa cần giải bài toán upload file hoàn chỉnh
- Mỗi user có thể nhập địa chỉ giao hàng khi tạo đơn; chưa cần sổ địa chỉ đầy đủ nếu muốn đi nhanh
- Chưa có khuyến mãi, phí vận chuyển động, hay cổng thanh toán
- Nếu sau này cần biến thể kiểu size/màu chi tiết hơn, có thể nâng từ `attributeSummary` sang cặp `optionName/optionValue` mà không phá toàn bộ domain `orders`
