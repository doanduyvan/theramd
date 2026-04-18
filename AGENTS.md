# AGENTS.md

## Quy ước làm việc với AI agent

- Chỉ được sửa các file do người dùng chỉ định hoặc cho phép rõ ràng.
- Không tự ý sửa các file khác ngoài phạm vi người dùng yêu cầu.
- Trước khi chỉnh sửa code, phải review file/liên quan và chỉ tiến hành sửa sau khi người dùng cho phép.
- Trước khi chỉnh sửa file trong dự án, luôn luôn đọc lại file `C:\duyvan\projects\theramd\source_theramd\AGENTS.md`.

## Mục tiêu dự án

- Dự án backend dùng NestJS + Prisma + MySQL.
- API phục vụ 2 nhóm:
- Public API: trả dữ liệu cho trang người dùng.
- Admin API: thao tác dữ liệu quản trị (CRUD, duyệt, cập nhật trạng thái).

## Nguyên tắc kiến trúc

- Tổ chức theo feature (module nghiệp vụ), không tách theo technical layer toàn cục.
- Mỗi domain có module riêng trong `src/modules`.
- Tách controller public và admin theo từng domain.
- Service dùng chung logic nghiệp vụ, controller chỉ điều phối request/response.
- Truy vấn DB đi qua repository/service, không viết truy vấn rải rác trong controller.

## Cấu trúc thư mục chuẩn

- `src/common`: guard, decorator, interceptor, filter, pipe, hằng số dùng chung.
- `src/config`: cấu hình env và app config.
- `src/prisma`: `PrismaModule`, `PrismaService`.
- `src/auth`: đăng nhập, JWT strategy, phân quyền.
- `src/modules/<domain>`:
- `<domain>.module.ts`
- `<domain>.service.ts`
- `<domain>.repository.ts`
- `controllers/<domain>.public.controller.ts`
- `controllers/<domain>.admin.controller.ts`
- `dto/public/*`
- `dto/admin/*`
- `entities/*`

## Quy ước route

- Prefix global: `/api/v1`.
- Public route: `/api/v1/<domain>`.
- Admin route: `/api/v1/admin/<domain>`.
- Không trộn endpoint public và admin trong cùng controller.

## Quy ước phân quyền

- Endpoint admin bắt buộc dùng `JwtAuthGuard`.
- Endpoint admin bắt buộc check role `admin` qua `RolesGuard`.
- Public endpoint mặc định không yêu cầu JWT, trừ endpoint đặc biệt.

## Quy ước DTO và response

- Mọi input qua DTO và validate bằng `class-validator`.
- Tách DTO theo ngữ cảnh:
- `dto/public`: DTO cho public API.
- `dto/admin`: DTO cho admin API.
- Không trả trực tiếp model DB thô; dùng response DTO rõ ràng.
- Không để lộ field nhạy cảm (password, token nội bộ, metadata không cần thiết).

## Quy ước đặt tên

- File dùng `kebab-case`.
- Class dùng `PascalCase`.
- Biến/hàm dùng `camelCase`.
- Tên controller:
- `<Domain>PublicController`
- `<Domain>AdminController`
- Tên DTO:
- `create-<domain>.dto.ts`
- `update-<domain>.dto.ts`
- `<domain>-detail.response.dto.ts`

## Quy ước Prisma

- Schema đặt tại `prisma/schema.prisma`.
- Mỗi thay đổi schema phải tạo migration, không sửa DB thủ công.
- Chỉ dùng `PrismaService` để truy cập Prisma Client.
- Query phức tạp đặt ở repository tương ứng của domain.

## Quy ước xử lý lỗi

- Dùng HTTP exception chuẩn của NestJS.
- Không throw lỗi chuỗi tự do.
- Thống nhất format lỗi qua exception filter (khi đã có).

## Quy ước logging

- Log ở mức service/interceptor, không log tràn lan trong controller.
- Không log dữ liệu nhạy cảm.
- Log cần đủ context: module, action, requestId (nếu có).

## Quy ước test

- Unit test cho service và util quan trọng.
- E2E test cho luồng chính của public/admin API.
- Khi thêm endpoint mới, cần thêm tối thiểu 1 test tương ứng.

## Quy ước môi trường

- Biến môi trường định nghĩa trong `.env`.
- Validate env tại `src/config/env.validation.ts`.
- Không hard-code secret trong source code.

## Quy ước code style

- Bật strict TypeScript.
- ESLint + Prettier là bắt buộc.
- Ưu tiên code rõ ràng, tránh tối ưu sớm.
- Hàm ngắn, 1 trách nhiệm chính.

## Quy ước Git

- Nhánh mới dùng prefix: `feature/`, `fix/`, `chore/`.
- Commit message dạng: `<type>: <short-description>`.
- Type hợp lệ: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`.
- Không commit file `.env` và thông tin bí mật.

## Nguyên tắc khi AI agent chỉnh code

- Luôn đọc file này trước khi sửa code.
- Trước mỗi lần sửa bất kỳ file nào trong dự án, phải đọc lại file `C:\duyvan\projects\theramd\source_theramd\AGENTS.md` rồi mới được thực hiện.
- Tuân thủ đúng cấu trúc module và route nêu trên.
- Không tự ý đổi convention khi chưa được yêu cầu.
- Nếu có mâu thuẫn giữa yêu cầu mới và convention, hỏi lại trước khi triển khai.

## Tài liệu kế hoạch

- Trước khi phân tích hoặc triển khai backend, đọc file `C:\duyvan\projects\theramd\source_theramd\docs\backend-phase-1-plan.md`.
- Nếu yêu cầu liên quan đến ecommerce phase 1, ưu tiên bám theo plan trong file này.
