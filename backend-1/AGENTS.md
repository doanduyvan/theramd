# AGENTS.md

## Quy ước làm việc với AI agent

- Chỉ được sửa các file do người dùng chỉ định hoặc cho phép rõ ràng.
- Không tự ý sửa các file khác ngoài phạm vi người dùng yêu cầu.
- Trước khi chỉnh sửa code, phải review file/liên quan và chỉ tiến hành sửa sau khi người dùng cho phép.
- Trước khi chỉnh sửa file trong dự án, luôn luôn đọc lại file `C:\duyvan\projects\theramd\source_theramd\AGENTS.md`.

## Mục tiêu dự án

- Dự án backend dùng NestJS + Prisma + MySQL.
- API được chia thành 2 nhánh chính:
- Customer API: phục vụ người dùng cuối, gồm cả API public và API yêu cầu JWT.
- Admin API: phục vụ trang quản trị, dùng session + cookie và phân quyền RBAC.

## Nguyên tắc kiến trúc

- Tổ chức code theo 2 nhánh rõ ràng: `admin` và `customer`.
- Không tổ chức nghiệp vụ theo technical layer toàn cục.
- Domain admin đặt trong `src/admin/<domain>`.
- Domain customer đặt trong `src/customer/<domain>`.
- Code dùng chung thật sự mới được đặt trong `src/common`.
- Không trộn logic admin và customer trong cùng một module/controller/service.
- Service dùng chung logic nghiệp vụ trong từng nhánh, controller chỉ điều phối request/response.
- Truy vấn DB đi qua repository/service, không viết truy vấn rải rác trong controller.

## Cấu trúc thư mục chuẩn

- `src/common`: guard, decorator, interceptor, filter, pipe, helper, constant dùng chung thật sự.
- `src/config`: cấu hình env và app config.
- `src/prisma`: `PrismaModule`, `PrismaService`.
- `src/admin`:
- `admin.module.ts`
- `auth`
- `<domain>`
- `src/customer`:
- `customer.module.ts`
- `auth`
- `<domain>`

Mỗi domain trong `src/admin/<domain>` hoặc `src/customer/<domain>` ưu tiên theo cấu trúc:

- `<domain>.module.ts`
- `<domain>.service.ts`
- `<domain>.repository.ts`
- `controllers/*`
- `dto/*`
- `entities/*`

## Quy ước route

- Prefix global: `/api/v1`.
- Customer route: `/api/v1/customer/<domain>`.
- Admin route: `/api/v1/admin/<domain>`.
- Không tạo route nghiệp vụ nằm ngoài 2 nhánh `/customer` và `/admin`.
- Chỉ nhánh `customer` mới có API public.
- Nhánh `admin` bắt buộc xác thực và phân quyền, ngoại lệ duy nhất là route đăng nhập admin.
- Route đăng nhập admin chuẩn: `/api/v1/admin/auth/login`.

## Quy ước xác thực và phân quyền

### Admin

- Admin dùng `session + cookie`, không dùng JWT.
- Cookie admin phải là `httpOnly`.
- Không trả JWT cho admin API.
- Session store dùng hướng đơn giản, không cần Redis trong phạm vi hiện tại.
- Session chỉ lưu dữ liệu tối thiểu cần thiết cho xác thực/phân quyền, không lưu dữ liệu nhạy cảm như password hash.
- Tất cả admin route, trừ route đăng nhập admin, phải đi qua session guard.
- Phân quyền admin theo RBAC từ database.
- RBAC admin bám theo các bảng/model hiện có trong schema như:
- `Admin`
- `Role`
- `Permission`
- `AdminRole`
- `RolePermission`
- Không được thay RBAC admin thành kiểu check cứng trong controller nếu chưa có yêu cầu rõ ràng.

### Customer

- Customer dùng JWT.
- API customer public mặc định không yêu cầu JWT.
- API customer cần đăng nhập thì bắt buộc dùng JWT guard.
- Không dùng session/cookie để xác thực customer nếu chưa có yêu cầu mới.

## Quy ước tách controller theo ngữ cảnh

- Admin controller đặt tên: `<Domain>AdminController`.
- Customer controller có thể tách theo ngữ cảnh:
- `<Domain>PublicController` cho API public.
- `<Domain>CustomerController` cho API customer cần JWT.
- Không trộn endpoint public, customer-authenticated và admin trong cùng controller.

## Quy ước DTO và response

- Mọi input phải đi qua DTO và validate bằng `class-validator`.
- DTO phải đặt theo đúng ngữ cảnh truy cập.
- Trong `src/admin/<domain>`, DTO đặt theo use case admin.
- Trong `src/customer/<domain>`, nếu domain có cả public và authenticated endpoint thì tách DTO theo ngữ cảnh như `dto/public` và `dto/customer`.
- Không trả trực tiếp model DB thô; phải dùng response DTO rõ ràng.
- Không để lộ field nhạy cảm như password hash, session data nội bộ, token nội bộ, metadata không cần thiết.

## Quy ước đặt tên

- File dùng `kebab-case`.
- Class dùng `PascalCase`.
- Biến/hàm dùng `camelCase`.

Tên controller:

- `<Domain>AdminController`
- `<Domain>CustomerController`
- `<Domain>PublicController`

Tên DTO:

- `create-<domain>.dto.ts`
- `update-<domain>.dto.ts`
- `login-admin.dto.ts`
- `login-customer.dto.ts`
- `<domain>-detail.response.dto.ts`

## Quy ước bootstrap và file chung

- `main.ts` chỉ là file khởi động ứng dụng.
- `main.ts` chỉ nên làm các việc bootstrap tối thiểu như:
- khởi tạo app
- set global prefix `/api/v1`
- gọi các bootstrap helper nếu thật sự cần
- start app
- Không đặt logic nghiệp vụ trong `main.ts`.
- Không đặt logic xác thực, phân quyền, RBAC, session, JWT trong `main.ts`.
- Không hard-code validation/filter/interceptor/guard mang tính nghiệp vụ trong `main.ts`.
- Các cấu hình/phần xử lý khác biệt giữa admin và customer phải đặt trong module/provider/guard/interceptor/filter thuộc `src/admin` hoặc `src/customer`.
- Chấp nhận trùng lặp code giữa admin và customer nếu khác biệt hành vi là rõ ràng và cần thiết.
- Không cố ép dùng chung nếu làm mờ ranh giới giữa 2 nhánh.

## Quy ước middleware, guard, filter, interceptor

- Logic riêng của admin phải nằm trong nhánh `src/admin`.
- Logic riêng của customer phải nằm trong nhánh `src/customer`.
- Chỉ các tiện ích thật sự dùng chung mới đặt ở `src/common`.
- Guard admin phải dựa trên session + RBAC.
- Guard customer phải dựa trên JWT.
- Không dùng một guard chung cho cả admin và customer nếu semantics khác nhau.

## Quy ước Prisma

- Schema đặt tại `backend/prisma/schema.prisma`.
- Mỗi thay đổi schema phải tạo migration, không sửa DB thủ công.
- Chỉ dùng `PrismaService` để truy cập Prisma Client.
- Query phức tạp phải đặt ở repository tương ứng của domain.
- Khi thiết kế auth và phân quyền phải bám sát schema hiện tại, đặc biệt với các model admin RBAC.

## Quy ước xử lý lỗi

- Dùng HTTP exception chuẩn của NestJS.
- Không throw lỗi chuỗi tự do.
- Thống nhất format lỗi qua exception filter khi dự án đã có filter chuẩn.
- Không trả lỗi lộ thông tin nội bộ như stack trace, SQL, session internals, permission internals.

## Quy ước logging

- Log ở mức service/interceptor/guard khi cần, không log tràn lan trong controller.
- Không log dữ liệu nhạy cảm.
- Không log password, token, session secret, cookie value.
- Log cần đủ context: module, action, requestId nếu có, actor type nếu có (`admin` hoặc `customer`).

## Quy ước test

- Unit test cho service, repository, util quan trọng.
- E2E test cho luồng chính của customer API và admin API.
- Khi thêm endpoint mới, cần thêm tối thiểu 1 test tương ứng.
- Với admin auth phải có test cho đăng nhập bằng session + cookie.
- Với customer auth phải có test cho đăng nhập/xác thực bằng JWT.
- Với admin route phải có test cho RBAC, gồm trường hợp thiếu quyền.

## Quy ước môi trường

- Biến môi trường định nghĩa trong `.env`.
- Validate env tại `src/config/env.validation.ts`.
- Không hard-code secret trong source code.
- Các biến liên quan đến auth phải tách rõ mục đích, ví dụ:
- session secret cho admin
- jwt secret cho customer
- Không dùng chung một secret cho nhiều cơ chế nếu không có lý do rõ ràng.

## Quy ước code style

- Bật strict TypeScript.
- ESLint + Prettier là bắt buộc.
- Ưu tiên code rõ ràng, tránh tối ưu sớm.
- Hàm ngắn, 1 trách nhiệm chính.
- Ưu tiên explicit hơn magic.
- Ưu tiên code dễ đọc hơn abstraction quá mức.

## Quy ước Git

- Nhánh mới dùng prefix: `feature/`, `fix/`, `chore/`.
- Commit message dạng: `<type>: <short-description>`.
- Type hợp lệ: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`.
- Không commit file `.env` và thông tin bí mật.

## Nguyên tắc khi AI agent chỉnh code

- Luôn đọc file này trước khi sửa code.
- Trước mỗi lần sửa bất kỳ file nào trong dự án, phải đọc lại file `C:\duyvan\projects\theramd\source_theramd\AGENTS.md` rồi mới được thực hiện.
- Tuân thủ đúng cấu trúc module, route, auth convention và phân quyền nêu trên.
- Không tự ý đổi convention khi chưa được yêu cầu.
- Nếu có mâu thuẫn giữa yêu cầu mới và convention, hỏi lại trước khi triển khai.
- Nếu cần thêm auth mới, guard mới, decorator mới hoặc filter mới, phải đặt đúng nhánh `admin` hoặc `customer` trước khi nghĩ đến `common`.
- Không được gộp admin auth và customer auth vào cùng một flow chỉ để giảm số file.

## Tài liệu kế hoạch

- Trước khi phân tích hoặc triển khai backend, đọc file `C:\duyvan\projects\theramd\source_theramd\docs\backend-phase-1-plan.md`.
- Nếu yêu cầu liên quan đến ecommerce phase 1, ưu tiên bám theo plan trong file này.
- Nếu plan cũ mâu thuẫn với convention mới trong file này, ưu tiên làm theo `AGENTS.md` và hỏi lại người dùng nếu cần.
