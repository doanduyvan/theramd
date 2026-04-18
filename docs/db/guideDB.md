# Nhóm người dùng và phân quyền

1. Bảng customers:

Mục đích: lưu tài khoản khách hàng mua hàng.

id: Khóa chính
full_name: Họ tên khách hàng
email: Email đăng nhập, duy nhất
phone: Số điện thoại, có thể dùng để liên hệ
password_hash: Mật khẩu đã mã hóa
gender: Giới tính
birth_date: Ngày sinh
avatar: Ảnh đại diện
status: Trạng thái tài khoản
email_verified_at: Thời điểm xác thực email
last_login_at: Lần đăng nhập gần nhất
created_at: Ngày tạo
updated_at: Ngày cập nhật

Ghi chú:

Mỗi khách hàng có thể có nhiều địa chỉ, nhiều đơn hàng, nhiều review, nhiều giỏ hàng.

2. Bảng customer_addresses:

Mục đích: lưu địa chỉ giao hàng của khách hàng.

id: Khóa chính
customer_id: Thuộc khách hàng nào
recipient_name: Tên người nhận
recipient_phone: Số điện thoại người nhận
province: Tỉnh/thành
district: Quận/huyện
ward: Phường/xã
address_line: Địa chỉ chi tiết
postal_code: Mã bưu chính
is_default: Có phải địa chỉ mặc định không
created_at: Ngày tạo
updated_at: Ngày cập nhật

Hiểu đơn giản:

Một khách hàng có thể lưu nhiều địa chỉ giao hàng khác nhau.

3. Bảng admins:

Mục đích: lưu tài khoản quản trị viên.

id: Khóa chính
full_name: Họ tên admin
email: Email đăng nhập admin
phone: Số điện thoại
password_hash: Mật khẩu đã mã hóa
avatar: Ảnh đại diện
status: Trạng thái admin
last_login_at: Lần đăng nhập gần nhất
created_at: Ngày tạo
updated_at: Ngày cập nhật

Ghi chú:

Admin dùng chung hệ phân quyền theo role và permission.

4. Bảng roles:

Mục đích: lưu vai trò của admin.

id: Khóa chính
name: Tên vai trò
code: Mã vai trò
description: Mô tả vai trò
created_at: Ngày tạo
updated_at: Ngày cập nhật

Ví dụ:

Super Admin
Quản lý sản phẩm
Quản lý đơn hàng
Nhân viên kho

5. Bảng permissions:

Mục đích: lưu từng quyền cụ thể trong hệ thống.

id: Khóa chính
name: Tên quyền
code: Mã quyền duy nhất
module: Nhóm chức năng, ví dụ product, order, coupon
description: Mô tả quyền
created_at: Ngày tạo
updated_at: Ngày cập nhật

Ghi chú:

Mô hình admin → role → permission đúng với lõi RBAC chuẩn.

6. Bảng role_permissions:

Mục đích: gán quyền cho vai trò.

role_id: Vai trò nào
permission_id: Quyền nào

Unique / khóa chính:

(role_id, permission_id)

Hiểu đơn giản:

Một role có nhiều permission, và một permission có thể thuộc nhiều role.

7. Bảng admin_roles:

Mục đích: gán vai trò cho admin.

admin_id: Admin nào
role_id: Vai trò nào

Unique / khóa chính:

(admin_id, role_id)

Hiểu đơn giản:

Một admin có thể có nhiều role.

# Nhóm danh mục và sản phẩm

8. Bảng categories:

Mục đích: lưu danh mục sản phẩm.

id: Khóa chính
parent_id: Danh mục cha
name: Tên danh mục
slug: Chuỗi thân thiện URL
image: Ảnh danh mục
description: Mô tả danh mục
sort_order: Thứ tự hiển thị
status: Trạng thái danh mục
created_at: Ngày tạo
updated_at: Ngày cập nhật

Hiểu đơn giản:

Bảng này cho phép làm danh mục nhiều cấp, ví dụ Chăm sóc da → Serum.

9. Bảng products:

Mục đích: lưu thông tin chung của sản phẩm cha.

id: Khóa chính
category_id: Thuộc danh mục nào
name: Tên sản phẩm
slug: URL thân thiện
short_description: Mô tả ngắn
description: Mô tả chi tiết
ingredients_content: Nội dung thành phần
usage_instructions: Hướng dẫn sử dụng
storage_instructions: Hướng dẫn bảo quản
warning_text: Cảnh báo/lưu ý
origin_country: Xuất xứ
product_type: Kiểu sản phẩm, simple hoặc variant
status: Trạng thái sản phẩm
is_featured: Có phải sản phẩm nổi bật không
seo_title: Tiêu đề SEO
seo_description: Mô tả SEO
created_by: Admin tạo sản phẩm
updated_by: Admin sửa gần nhất
created_at: Ngày tạo
updated_at: Ngày cập nhật

Ghi chú:

Đây là bảng sản phẩm cha, dùng để lưu nội dung hiển thị chung.

10. Bảng product_variants:

Mục đích: lưu từng biến thể bán thực tế của sản phẩm.

id: Khóa chính
product_id: Thuộc sản phẩm cha nào
sku: Mã SKU duy nhất
barcode: Mã vạch
variant_name: Tên hiển thị của variant
option_summary: Chuỗi tóm tắt option của variant
volume_ml: Dung tích ml
weight_g: Khối lượng gram
cost_price: Giá vốn
price: Giá bán
compare_at_price: Giá niêm yết / giá gốc
status: Trạng thái variant
is_default: Có phải variant mặc định không
created_at: Ngày tạo
updated_at: Ngày cập nhật

Hiểu đơn giản:

Đây là bảng “món hàng thật sự được bán”. Variant là nơi phù hợp để giữ SKU, giá, barcode và tồn kho.

11. Bảng product_images:

Mục đích: lưu ảnh của sản phẩm.

id: Khóa chính
product_id: Ảnh thuộc sản phẩm nào
image_url: Đường dẫn ảnh
alt_text: Nội dung mô tả ảnh
sort_order: Thứ tự hiển thị
is_primary: Có phải ảnh chính không
created_at: Ngày tạo

Hiểu đơn giản:

Một sản phẩm có thể có nhiều ảnh.

# Nhóm thuộc tính và biến thể

12. Bảng attributes:

Mục đích: lưu tên thuộc tính của variant.

id: Khóa chính
name: Tên thuộc tính, ví dụ Size, Color, Volume
created_at: Ngày tạo
updated_at: Ngày cập nhật

13. Bảng attribute_values:

Mục đích: lưu giá trị của từng thuộc tính.

id: Khóa chính
attribute_id: Thuộc tính nào
value: Giá trị của thuộc tính, ví dụ 30ml, đỏ
created_at: Ngày tạo
updated_at: Ngày cập nhật

Unique:

(attribute_id, value)

Hiểu đơn giản:

Một thuộc tính có nhiều giá trị, ví dụ Size có 10ml, 30ml, 50ml.

14. Bảng variant_attribute_values:

Mục đích: gắn variant với các giá trị thuộc tính.

variant_id: Variant nào
attribute_value_id: Giá trị thuộc tính nào

Unique / khóa chính:

(variant_id, attribute_value_id)

Hiểu đơn giản:

Bảng này xác định chính xác mỗi variant đang mang những option nào.

# Nhóm dữ liệu riêng cho mỹ phẩm

15. Bảng skin_types:

Mục đích: lưu danh sách loại da.

id: Khóa chính
name: Tên loại da

Ví dụ:

Da dầu
Da khô
Da nhạy cảm

16. Bảng skin_concerns:

Mục đích: lưu danh sách vấn đề da.

id: Khóa chính
name: Tên vấn đề da

Ví dụ:

Mụn
Thâm nám
Lão hóa

17. Bảng product_skin_types:

Mục đích: gắn sản phẩm với loại da phù hợp.

product_id: Sản phẩm nào
skin_type_id: Loại da nào

Unique / khóa chính:

(product_id, skin_type_id)

18. Bảng product_skin_concerns:

Mục đích: gắn sản phẩm với vấn đề da phù hợp.

product_id: Sản phẩm nào
skin_concern_id: Vấn đề da nào

Unique / khóa chính:

(product_id, skin_concern_id)

Hiểu đơn giản:

Hai bảng này giúp lọc sản phẩm theo loại da và concern.

# Nhóm kho và tồn kho

19. Bảng warehouses:

Mục đích: lưu thông tin kho hàng.

id: Khóa chính
name: Tên kho
code: Mã kho duy nhất
address: Địa chỉ kho
created_at: Ngày tạo
updated_at: Ngày cập nhật

20. Bảng inventory:

Mục đích: tồn kho hiện tại của từng variant tại từng kho.

id: Khóa chính
warehouse_id: Ở kho nào
variant_id: Của variant nào
quantity: Số lượng tồn thực tế
reserved_quantity: Số lượng đã giữ cho đơn hàng
min_stock: Mức tồn tối thiểu
created_at: Không có trong schema hiện tại
updated_at: Không có trong schema hiện tại

Unique:

(warehouse_id, variant_id)

Hiểu đơn giản:

Một dòng = “variant X đang còn bao nhiêu ở kho Y”. Variant-level inventory và location-level inventory là cách tổ chức rất phổ biến trong commerce.

21. Bảng inventory_transactions:

Mục đích: lưu lịch sử biến động tồn kho.

id: Khóa chính
warehouse_id: Kho nào
variant_id: Variant nào
type: Loại giao dịch tồn kho, ví dụ nhập, xuất, điều chỉnh
quantity: Số lượng thay đổi
reference_type: Loại tham chiếu phát sinh giao dịch
reference_id: ID tham chiếu liên quan
note: Ghi chú
created_by: Admin nào thực hiện
created_at: Ngày tạo

Hiểu đơn giản:

Đây là sổ lịch sử nhập/xuất/điều chỉnh kho.

# Nhóm giỏ hàng và yêu thích

22. Bảng carts:

Mục đích: lưu giỏ hàng của khách.

id: Khóa chính
customer_id: Khách hàng nào
session_token: Mã session nếu chưa đăng nhập
created_at: Ngày tạo
updated_at: Ngày cập nhật

Hiểu đơn giản:

Một giỏ hàng có thể thuộc khách đăng nhập hoặc phiên tạm thời.

23. Bảng cart_items:

Mục đích: lưu các sản phẩm trong giỏ hàng.

id: Khóa chính
cart_id: Thuộc giỏ nào
variant_id: Variant nào
quantity: Số lượng
created_at: Ngày tạo
updated_at: Ngày cập nhật

Unique:

(cart_id, variant_id)

Hiểu đơn giản:

Trong một giỏ, một variant chỉ nên có một dòng.

24. Bảng wishlists:

Mục đích: lưu danh sách yêu thích của khách.

id: Khóa chính
customer_id: Khách hàng nào
created_at: Ngày tạo
updated_at: Ngày cập nhật

25. Bảng wishlist_items:

Mục đích: lưu sản phẩm trong danh sách yêu thích.

id: Khóa chính
wishlist_id: Thuộc wishlist nào
product_id: Sản phẩm nào
created_at: Ngày tạo

Unique:

(wishlist_id, product_id)

Hiểu đơn giản:

Một khách có thể lưu sản phẩm yêu thích để xem lại sau.

# Nhóm đơn hàng

26. Bảng orders:

Mục đích: lưu thông tin đầu đơn hàng.

id: Khóa chính
customer_id: Khách hàng nào đặt
order_code: Mã đơn hàng duy nhất
customer_name: Tên khách hàng tại thời điểm đặt
customer_phone: Số điện thoại tại thời điểm đặt
customer_email: Email tại thời điểm đặt
shipping_recipient_name: Tên người nhận
shipping_phone: Số điện thoại người nhận
shipping_province: Tỉnh/thành giao hàng
shipping_district: Quận/huyện giao hàng
shipping_ward: Phường/xã giao hàng
shipping_address_line: Địa chỉ chi tiết giao hàng
note: Ghi chú đơn hàng
subtotal: Tổng tiền hàng trước giảm giá
discount_amount: Số tiền giảm giá
shipping_fee: Phí giao hàng
tax_amount: Thuế
grand_total: Tổng thanh toán cuối cùng
coupon_code: Mã coupon áp dụng
payment_status: Trạng thái thanh toán của đơn
order_status: Trạng thái nghiệp vụ của đơn
created_at: Ngày tạo
updated_at: Ngày cập nhật

Hiểu đơn giản:

Đây là bảng đầu đơn, lưu thông tin chung của đơn hàng. Adobe Commerce cũng tách workflow đơn hàng theo trạng thái riêng thay vì trộn với tracking vận chuyển.

27. Bảng order_items:

Mục đích: lưu từng dòng sản phẩm trong đơn.

id: Khóa chính
order_id: Thuộc đơn nào
product_id: Sản phẩm cha nào
variant_id: Variant nào được mua
product_name: Tên sản phẩm snapshot tại thời điểm mua
variant_name: Tên variant snapshot tại thời điểm mua
sku: SKU snapshot
unit_price: Giá bán một đơn vị tại thời điểm mua
compare_at_price: Giá niêm yết tại thời điểm mua
discount_amount: Giảm giá của dòng hàng
quantity: Số lượng mua
line_total: Tổng tiền của dòng hàng
created_at: Ngày tạo
updated_at: Ngày cập nhật

Hiểu đơn giản:

Đây là chi tiết từng món hàng trong đơn.

28. Bảng order_status_history:

Mục đích: lưu lịch sử thay đổi trạng thái đơn.

id: Khóa chính
order_id: Đơn nào
old_status: Trạng thái cũ
new_status: Trạng thái mới
note: Ghi chú khi đổi trạng thái
changed_by: Admin nào đổi
created_at: Thời điểm đổi

Hiểu đơn giản:

Bảng này dùng để audit lịch sử xử lý đơn.

# Nhóm thanh toán

29. Bảng payments:

Mục đích: lưu bản ghi thanh toán của đơn hàng.

id: Khóa chính
order_id: Thanh toán cho đơn nào
payment_method: Phương thức thanh toán
amount: Số tiền thanh toán
status: Trạng thái thanh toán
transaction_code: Mã giao dịch
paid_at: Thời điểm thanh toán thành công
created_at: Ngày tạo
updated_at: Ngày cập nhật

Hiểu đơn giản:

Một đơn có thể có một hoặc nhiều bản ghi thanh toán tùy nghiệp vụ.

30. Bảng payment_transactions:

Mục đích: lưu log chi tiết giao dịch với cổng thanh toán.

id: Khóa chính
payment_id: Thuộc payment nào
gateway: Tên cổng thanh toán
transaction_ref: Mã tham chiếu từ gateway
transaction_type: Loại giao dịch
amount: Số tiền
raw_response: Dữ liệu gốc từ gateway
status: Trạng thái giao dịch
created_at: Ngày tạo

Hiểu đơn giản:

Nếu payments là bản ghi tổng quan, thì bảng này là log kỹ thuật chi tiết.

# Nhóm giao vận và tracking

31. Bảng shipments:

Mục đích: lưu thông tin giao vận của đơn hàng.

id: Khóa chính
order_id: Thuộc đơn nào
shipping_provider: Đơn vị vận chuyển
tracking_number: Mã vận đơn
tracking_url: Link tra cứu vận đơn
shipping_status: Trạng thái giao hàng
carrier_status_code: Mã trạng thái gốc từ hãng
carrier_status_text: Nội dung trạng thái gốc từ hãng
delivery_failed_reason: Lý do giao thất bại
shipped_at: Thời điểm gửi hàng
delivered_at: Thời điểm giao thành công
last_tracking_at: Lần cuối đồng bộ tracking
created_at: Ngày tạo
updated_at: Ngày cập nhật

Hiểu đơn giản:

Đây là bảng trạng thái vận chuyển, tách riêng khỏi trạng thái nội bộ của đơn. Shippo hỗ trợ normalized tracking data và webhook để tự cập nhật trạng thái giao vận.

32. Bảng shipment_items:

Mục đích: lưu các dòng hàng thuộc từng shipment.

id: Khóa chính
shipment_id: Thuộc shipment nào
order_item_id: Dòng hàng nào của đơn
quantity: Số lượng được giao trong shipment này

Hiểu đơn giản:

Bảng này hữu ích khi một đơn có thể giao nhiều đợt.

33. Bảng shipment_tracking_events:

Mục đích: lưu lịch sử các sự kiện tracking của vận đơn.

id: Khóa chính
shipment_id: Thuộc shipment nào
status_code: Mã trạng thái event
status_text: Nội dung trạng thái event
substatus_code: Mã trạng thái phụ
substatus_text: Nội dung trạng thái phụ
location: Vị trí phát sinh event
event_time: Thời điểm xảy ra event
raw_payload: Dữ liệu gốc từ webhook / API tracking
created_at: Ngày tạo

Hiểu đơn giản:

Bảng này lưu lịch sử tracking, không chỉ trạng thái hiện tại. Shippo nêu rõ tracking có normalized data, complete tracking history và real-time updates khi dùng webhook.

# Nhóm hoàn tiền

34. Bảng refunds:

Mục đích: lưu thông tin hoàn tiền.

id: Khóa chính
order_id: Đơn nào được hoàn tiền
payment_id: Thanh toán nào liên quan
refund_code: Mã hoàn tiền duy nhất
amount: Tổng tiền hoàn
reason: Lý do hoàn tiền
status: Trạng thái hoàn tiền
created_at: Ngày tạo
updated_at: Ngày cập nhật

Hiểu đơn giản:

Đây là bản ghi đầu của nghiệp vụ hoàn tiền.

35. Bảng refund_items:

Mục đích: lưu chi tiết các dòng hàng được hoàn tiền.

id: Khóa chính
refund_id: Thuộc refund nào
order_item_id: Dòng hàng nào được hoàn
quantity: Số lượng hoàn
amount: Tiền hoàn cho dòng đó

Hiểu đơn giản:

Bảng này giúp hoàn tiền theo từng item thay vì chỉ theo toàn đơn.

# Nhóm khuyến mãi

36. Bảng coupons:

Mục đích: lưu mã giảm giá.

id: Khóa chính
code: Mã coupon duy nhất
name: Tên chương trình giảm giá
description: Mô tả
discount_type: Kiểu giảm giá
discount_value: Giá trị giảm
min_order_value: Giá trị đơn tối thiểu để áp dụng
max_discount_value: Mức giảm tối đa
usage_limit: Tổng số lần sử dụng tối đa
usage_limit_per_customer: Số lần dùng tối đa cho mỗi khách
start_at: Thời điểm bắt đầu áp dụng
end_at: Thời điểm kết thúc áp dụng
status: Trạng thái coupon
created_at: Ngày tạo
updated_at: Ngày cập nhật

Hiểu đơn giản:

Đây là bảng đầu của khuyến mãi. Các kiểu giảm như percent, fixed order, fixed product là cách tổ chức rất phổ biến trong e-commerce.

37. Bảng coupon_conditions:

Mục đích: lưu điều kiện áp dụng coupon.

id: Khóa chính
coupon_id: Thuộc coupon nào
condition_type: Loại điều kiện
condition_value: Giá trị điều kiện

Hiểu đơn giản:

Bảng này dùng để giới hạn coupon theo category, product hoặc first order.

38. Bảng coupon_usages:

Mục đích: lưu lịch sử sử dụng coupon.

id: Khóa chính
coupon_id: Coupon nào
customer_id: Khách nào đã dùng
order_id: Dùng trong đơn nào
used_at: Thời điểm sử dụng

Hiểu đơn giản:

Bảng này dùng để kiểm soát quota và tra cứu lịch sử dùng mã giảm giá.

# Nhóm đánh giá

39. Bảng reviews:

Mục đích: lưu đánh giá sản phẩm của khách hàng.

id: Khóa chính
product_id: Đánh giá cho sản phẩm nào
customer_id: Khách nào đánh giá
order_item_id: Dòng hàng đã mua liên quan
rating: Số sao
title: Tiêu đề đánh giá
content: Nội dung đánh giá
is_verified_purchase: Có phải đã mua thật không
status: Trạng thái duyệt review
created_at: Ngày tạo
updated_at: Ngày cập nhật

Hiểu đơn giản:

Bảng này lưu nội dung review và hỗ trợ kiểm tra review có mua thật hay không.

40. Bảng review_images:

Mục đích: lưu ảnh của review.

id: Khóa chính
review_id: Thuộc review nào
image_url: Đường dẫn ảnh
created_at: Ngày tạo

Hiểu đơn giản:

Một review có thể có nhiều ảnh minh họa.

# Nhóm hiển thị giao diện

41. Bảng banners:

Mục đích: lưu banner hiển thị trên website.

id: Khóa chính
title: Tên banner
image_url: Ảnh banner
link_url: Link khi bấm vào banner
position: Vị trí hiển thị
sort_order: Thứ tự sắp xếp
status: Trạng thái banner
created_at: Ngày tạo
updated_at: Ngày cập nhật

Hiểu đơn giản:

Dùng để quản lý banner trang chủ hoặc các vị trí quảng bá trên website.
Ghi chú tổng quát
Nhóm admin / role / permission là phần phân quyền. RBAC chuẩn dựa trên quan hệ user-role và permission-role.
Nhóm products / product_variants / inventory là lõi bán hàng. Variant thường là nơi giữ SKU, giá và tồn kho.
Nhóm orders / payments / shipments / shipment_tracking_events là lõi xử lý đơn hàng và giao vận. Tracking nên tự đồng bộ bằng webhook hoặc polling, không nên cập nhật tay từng đơn.
