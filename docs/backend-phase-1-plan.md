# Kế hoạch backend phase 1

## Tóm tắt

Xây dựng backend API cho hệ thống ecommerce trên nền NestJS + Prisma + MySQL, bám theo convention mới trong `AGENTS.md`:

- Global prefix: `/api/v1`
- Tách 2 nhánh chính:
- `/api/v1/admin/...`
- `/api/v1/customer/...`
- Admin dùng `session + cookie`
- Customer dùng `JWT`
- Chỉ customer mới có API public
- Admin phân quyền theo RBAC từ database
- `main.ts` chỉ làm bootstrap, không chứa logic dùng chung mang tính nghiệp vụ
- Tách code theo 2 nhánh rõ ràng:
- `src/admin/<domain>`
- `src/customer/<domain>`
- Phần dùng chung thật sự đặt tại `src/common`

Mục tiêu phase 1:

- Có schema Prisma và migration đầu tiên cho các domain cốt lõi
- Có customer API cho auth, catalog, cart, order
- Có admin API cho auth, category, product, variant, order
- Có RBAC admin hoạt động theo session + cookie
- Có seed dữ liệu mẫu và test cho các luồng chính

## Các quyết định kiến trúc đã khóa

- Scope phase 1: chỉ triển khai backend API, chưa làm frontend
- Customer auth:
- Public API nằm trong nhánh `/customer`
- Route customer private dùng JWT
- Admin auth:
- Dùng `session + cookie`
- Không dùng JWT cho admin
- Session store đi theo hướng đơn giản, không dùng Redis trong phase này
- Admin RBAC bám theo các model hiện có trong schema:
- `Admin`
- `Role`
- `Permission`
- `AdminRole`
- `RolePermission`
- Chỉ nhánh `admin` mới được phép thao tác dữ liệu quản trị
- Chỉ nhánh `customer` mới được phép có API public
- Không tạo route nghiệp vụ ngoài `/admin` và `/customer`
- Chấp nhận trùng lặp cấu hình giữa `admin` và `customer` nếu hành vi khác nhau rõ ràng
- Không nhồi logic auth, RBAC, filter, interceptor nghiệp vụ vào `main.ts`

## Cấu trúc thư mục mục tiêu

Backend được tổ chức lại theo 3 vùng chính:

- `src/common`
- `src/config`
- `src/prisma`
- `src/admin`
- `src/customer`

Cấu trúc đề xuất:

- `src/admin/admin.module.ts`
- `src/admin/auth`
- `src/admin/categories`
- `src/admin/products`
- `src/admin/orders`
- `src/admin/roles`
- `src/admin/permissions`

- `src/customer/customer.module.ts`
- `src/customer/auth`
- `src/customer/categories`
- `src/customer/products`
- `src/customer/cart`
- `src/customer/orders`
- `src/customer/profile`
- `src/customer/wishlist`

- `src/common`
- các helper, constant, util, base exception/filter/decorator thật sự dùng chung
- không đặt guard admin/customer đặc thù ở đây nếu semantics khác nhau

Mỗi domain ưu tiên có:

- `<domain>.module.ts`
- `<domain>.service.ts`
- `<domain>.repository.ts`
- `controllers/*`
- `dto/*`
- `entities/*`

## Quy ước route mới

### Customer

- Public route: `/api/v1/customer/<domain>`
- Private route customer: vẫn dưới `/api/v1/customer/<domain>` nhưng bắt buộc JWT khi cần đăng nhập
- Ví dụ:
- `POST /api/v1/customer/auth/register`
- `POST /api/v1/customer/auth/login`
- `GET /api/v1/customer/products`
- `GET /api/v1/customer/products/:slug`
- `GET /api/v1/customer/cart`
- `POST /api/v1/customer/orders`

### Admin

- Admin route: `/api/v1/admin/<domain>`
- Tất cả admin route bắt buộc xác thực bằng session + cookie, ngoại trừ route đăng nhập
- Ví dụ:
- `POST /api/v1/admin/auth/login`
- `POST /api/v1/admin/auth/logout`
- `GET /api/v1/admin/auth/me`
- `GET /api/v1/admin/products`
- `POST /api/v1/admin/products`
- `PATCH /api/v1/admin/orders/:id/status`

## Thiết kế auth và phân quyền

### Customer auth

- Customer đăng ký và đăng nhập bằng email/password
- Sau khi đăng nhập trả về JWT access token
- Customer private endpoints dùng JWT guard
- Public endpoints trong nhánh customer không yêu cầu JWT
- Các DTO auth chính:
- `register-customer.dto.ts`
- `login-customer.dto.ts`
- `customer-auth-response.dto.ts`

### Admin auth

- Admin đăng nhập bằng email/password
- Sau khi đăng nhập, server tạo session và set cookie `httpOnly`
- Không trả JWT cho admin
- Session chỉ lưu thông tin tối thiểu:
- `adminId`
- danh sách role code hoặc permission code nếu cần tối ưu check quyền
- Guard admin xác thực session hiện có
- Guard phân quyền admin kiểm tra RBAC từ session hoặc từ DB theo thiết kế service
- Các DTO auth chính:
- `login-admin.dto.ts`
- `admin-session-user.response.dto.ts`

### RBAC admin

RBAC sử dụng các model hiện có trong schema:

- `Admin`
- `Role`
- `Permission`
- `AdminRole`
- `RolePermission`

Các yêu cầu phase 1:

- Có cơ chế lấy danh sách role/permission của admin đăng nhập
- Có decorator hoặc metadata để khai báo permission cho admin route
- Có guard kiểm tra permission tương ứng
- Không hard-code quyền ngay trong controller

## Domain phase 1 cần triển khai

### Customer domains

- `auth`
- `categories`
- `products`
- `cart`
- `orders`

### Admin domains

- `auth`
- `categories`
- `products`
- `orders`

### Có thể chuẩn bị trước nhưng chưa bắt buộc hoàn thiện trong phase 1

- `wishlist`
- `reviews`
- `banners`
- `coupons`
- `shipments`

## Phạm vi nghiệp vụ phase 1

- Checkout bắt buộc đăng nhập customer
- Thanh toán mặc định: COD
- Product có biến thể
- Mỗi biến thể có SKU, giá, tồn kho riêng
- Một kho chính trong phase 1
- Admin quản lý category, product, variant, order
- Customer xem catalog, thêm giỏ hàng, tạo đơn, xem lịch sử đơn

## Thiết kế dữ liệu cốt lõi

Bám theo `prisma/schema.prisma`, phase 1 tập trung sử dụng các nhóm model chính:

### Nhóm customer và auth

- `Customer`
- `CustomerAddress`

### Nhóm admin và RBAC

- `Admin`
- `Role`
- `Permission`
- `AdminRole`
- `RolePermission`

### Nhóm catalog

- `Category`
- `Product`
- `ProductVariant`
- `ProductImage`
- `Attribute`
- `AttributeValue`
- `VariantAttributeValue`

### Nhóm tồn kho

- `Warehouse`
- `Inventory`
- `InventoryTransaction`

### Nhóm bán hàng

- `Cart`
- `CartItem`
- `Order`
- `OrderItem`
- `OrderStatusHistory`
- `Payment`

## Nguyên tắc thiết kế API

- Controller chỉ điều phối request/response
- Business logic đặt ở service
- Query phức tạp đặt ở repository
- Input luôn đi qua DTO và `class-validator`
- Không trả Prisma model thô ra ngoài
- Luôn map sang response DTO
- Không lộ password hash, session data nội bộ, permission nội bộ không cần thiết
- Public product chỉ trả dữ liệu cần thiết cho storefront
- Admin API trả dữ liệu phục vụ quản trị nhưng vẫn không lộ field nhạy cảm

## Kế hoạch triển khai theo bước

### Bước 1: Chuẩn hóa nền backend

- Hoàn tất cấu hình Prisma 6 cho NestJS hiện tại
- Chuẩn hóa `ConfigModule`, `env.validation.ts`, `PrismaModule`
- Giữ `main.ts` ở mức bootstrap tối thiểu
- Tách `AdminModule` và `CustomerModule`
- Chuẩn hóa cấu trúc thư mục `src/admin`, `src/customer`, `src/common`

### Bước 2: Hoàn thiện schema và migration đầu tiên

- Rà lại schema Prisma theo đúng naming và relation
- Tạo migration đầu tiên
- Sinh Prisma Client
- Chuẩn bị seed dữ liệu mẫu:
- admin account
- role/permission cơ bản
- category
- product
- variant
- warehouse
- inventory

### Bước 3: Xây customer auth bằng JWT

- Tạo `src/customer/auth`
- API:
- `POST /api/v1/customer/auth/register`
- `POST /api/v1/customer/auth/login`
- `GET /api/v1/customer/auth/me`
- Tạo JWT strategy / JWT guard cho customer
- Hash password cho customer
- Trả response auth rõ ràng

### Bước 4: Xây admin auth bằng session + cookie

- Tạo `src/admin/auth`
- API:
- `POST /api/v1/admin/auth/login`
- `POST /api/v1/admin/auth/logout`
- `GET /api/v1/admin/auth/me`
- Tạo session guard cho admin
- Tạo cookie/session flow cho admin
- Cập nhật `lastLoginAt` cho admin sau đăng nhập thành công
- Tạo response hiện tại của admin đăng nhập

### Bước 5: Xây admin RBAC

- Tạo decorator khai báo permission cho admin route
- Tạo guard kiểm tra permission
- Load role/permission từ DB theo admin đăng nhập
- Bảo vệ các admin route theo permission
- Chuẩn hóa mã quyền theo domain/action, ví dụ:
- `products.read`
- `products.create`
- `products.update`
- `orders.update_status`

### Bước 6: Xây customer catalog

- `src/customer/categories`
- `src/customer/products`
- Public APIs:
- danh sách category đang active
- danh sách product đang active
- chi tiết product theo slug
- filter cơ bản:
- category
- keyword
- sort
- pagination
- Product detail cần trả:
- product info
- images
- variants đang active
- giá min/max
- availability cơ bản

### Bước 7: Xây admin catalog

- `src/admin/categories`
- `src/admin/products`
- Admin APIs:
- CRUD category
- CRUD product
- CRUD variant
- cập nhật trạng thái publish/unpublish
- cập nhật giá và tồn kho
- bảo vệ theo RBAC

### Bước 8: Xây customer cart và order

- `src/customer/cart`
- `src/customer/orders`
- APIs:
- `GET /api/v1/customer/cart`
- `POST /api/v1/customer/cart/items`
- `PATCH /api/v1/customer/cart/items/:id`
- `DELETE /api/v1/customer/cart/items/:id`
- `POST /api/v1/customer/orders`
- `GET /api/v1/customer/orders`
- `GET /api/v1/customer/orders/:id`
- Khi tạo order:
- kiểm tra tồn kho
- snapshot giá
- snapshot product/variant name
- tạo payment mặc định theo COD nếu cần
- trừ tồn kho
- ghi lịch sử trạng thái đơn

### Bước 9: Xây admin orders

- `src/admin/orders`
- APIs:
- list order
- order detail
- cập nhật order status
- các chuyển trạng thái chính:
- `pending -> confirmed`
- `confirmed -> processing`
- `processing -> shipping`
- `shipping -> completed`
- `pending|confirmed|processing -> cancelled`
- hoàn tồn kho khi hủy đơn nếu phù hợp flow nghiệp vụ

### Bước 10: Hoàn thiện kỹ thuật và tài liệu

- Seed script hoàn chỉnh
- README backend
- API docs nội bộ
- test unit
- test e2e
- chuẩn hóa lỗi và response shape

## Contract API quan trọng cần khóa sớm

### Customer auth

- `register-customer.dto`
- `login-customer.dto`
- `customer-auth-response.dto`

### Admin auth

- `login-admin.dto`
- `admin-me.response.dto`

### Catalog

- `create-category.dto`
- `update-category.dto`
- `create-product.dto`
- `update-product.dto`
- `create-product-variant.dto`
- `update-product-variant.dto`
- `product-list.response.dto`
- `product-detail.response.dto`

### Cart và order

- `add-cart-item.dto`
- `update-cart-item.dto`
- `create-order.dto`
- `update-order-status.dto`
- `order-detail.response.dto`

## Test plan tối thiểu

### Unit test bắt buộc

- customer login thành công và thất bại
- admin login thành công và thất bại
- admin permission guard từ chối khi thiếu quyền
- tạo order thành công với nhiều cart item
- từ chối tạo order khi thiếu tồn kho
- hoàn tồn kho khi admin hủy order
- tính tổng tiền theo snapshot variant price

### E2E test bắt buộc

- customer lấy danh sách product public
- customer đăng ký hoặc đăng nhập rồi thao tác cart
- customer tạo order COD
- admin đăng nhập bằng session + cookie
- admin bị chặn khi chưa đăng nhập
- admin bị chặn khi không có permission
- admin CRUD product có variant
- admin cập nhật trạng thái order

## Điều kiện chấp nhận cuối phase

- `build`, `lint`, `test`, `test:e2e` chạy thành công
- migration có thể dựng DB từ đầu
- seed tạo được admin account, role, permission, category, product mẫu
- customer auth JWT hoạt động
- admin auth session + cookie hoạt động
- RBAC admin hoạt động trên các route quản trị chính
- toàn bộ route nghiệp vụ nằm đúng trong `/api/v1/customer/...` hoặc `/api/v1/admin/...`

## Mốc triển khai đề xuất

- Ngày 1: chuẩn hóa cấu trúc `admin/customer/common`, config, prisma
- Ngày 2: migration đầu tiên, seed, customer auth JWT
- Ngày 3: admin auth session + cookie, admin RBAC
- Ngày 4: customer catalog + admin categories/products
- Ngày 5: variants + inventory + cart
- Ngày 6: customer orders + admin orders
- Ngày 7: test, cleanup, docs

## Giả định và giới hạn của phase 1

- Chưa dùng Redis cho admin session
- Phù hợp số lượng admin ít
- Nếu sau này scale nhiều instance thì sẽ cần external session store
- Customer hiện dùng JWT access token là đủ cho phase 1
- Chưa ưu tiên refresh token nếu chưa thật sự cần
- Chưa triển khai dashboard nâng cao, voucher phức tạp, online payment hoàn chỉnh, đa kho, đa vendor
- Nếu `backend-phase-1-plan.md` có điểm nào mâu thuẫn với `AGENTS.md`, ưu tiên làm theo `AGENTS.md`
