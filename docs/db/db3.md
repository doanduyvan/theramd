Project cosmetics_ecommerce {
database_type: 'MySQL'
Note: 'CSDL web bán hàng mỹ phẩm - full version'
}

Enum customer_status_enum {
active
inactive
banned
}

Enum admin_status_enum {
active
inactive
blocked
}

Enum general_status_enum {
active
inactive
}

Enum product_status_enum {
draft
active
inactive
archived
}

Enum product_type_enum {
simple
variant
}

Enum variant_status_enum {
active
inactive
}

Enum order_payment_status_enum {
unpaid
partial
paid
failed
refunded
partially_refunded
}

Enum payment_status_enum {
pending
paid
failed
cancelled
refunded
partially_refunded
}

Enum order_status_enum {
pending
confirmed
processing
shipping
completed
cancelled
returned
}

Enum shipment_status_enum {
pending_pickup
pre_transit
in_transit
out_for_delivery
delivered
failed_attempt
exception
returned
unknown
}

Enum refund_status_enum {
pending
approved
rejected
completed
}

Enum review_status_enum {
pending
approved
rejected
}

Enum coupon_status_enum {
active
inactive
}

Enum discount_type_enum {
percent
fixed_order
fixed_product
free_shipping
}

Enum coupon_condition_type_enum {
category
product
first_order
}

Enum inventory_transaction_type_enum {
import
export
adjustment
reservation
release
}

Enum gender_enum {
male
female
other
}

Enum payment_method_enum {
cod
bank_transfer
vnpay
momo
zalopay
stripe
paypal
}

Table customers {
id bigint [pk, increment]
full_name varchar(150) [not null]
email varchar(150) [not null, unique]
phone varchar(20) [unique]
password_hash varchar(255) [not null]
gender gender_enum
birth_date date
avatar varchar(255)
status customer_status_enum [not null, default: 'active']
email_verified_at timestamp
last_login_at timestamp
created_at timestamp
updated_at timestamp

indexes {
email [name: 'idx_customers_email']
phone [name: 'idx_customers_phone']
status [name: 'idx_customers_status']
}
}

Table customer_addresses {
id bigint [pk, increment]
customer_id bigint [not null, ref: > customers.id]
recipient_name varchar(150) [not null]
recipient_phone varchar(20) [not null]
province varchar(100) [not null]
district varchar(100) [not null]
ward varchar(100) [not null]
address_line text [not null]
postal_code varchar(20)
is_default boolean [not null, default: false]
created_at timestamp
updated_at timestamp

indexes {
customer_id [name: 'idx_customer_addresses_customer']
}
}

Table admins {
id bigint [pk, increment]
full_name varchar(150) [not null]
email varchar(150) [not null, unique]
phone varchar(20) [unique]
password_hash varchar(255) [not null]
avatar varchar(255)
status admin_status_enum [not null, default: 'active']
last_login_at timestamp
created_at timestamp
updated_at timestamp

indexes {
email [name: 'idx_admins_email']
phone [name: 'idx_admins_phone']
status [name: 'idx_admins_status']
}
}

Table roles {
id bigint [pk, increment]
name varchar(100) [not null, unique]
code varchar(100) [not null, unique]
description varchar(255)
created_at timestamp
updated_at timestamp
}

Table permissions {
id bigint [pk, increment]
name varchar(150) [not null]
code varchar(150) [not null, unique]
module varchar(100) [not null]
description varchar(255)
created_at timestamp
updated_at timestamp

indexes {
module [name: 'idx_permissions_module']
}
}

Table role_permissions {
role_id bigint [not null, ref: > roles.id]
permission_id bigint [not null, ref: > permissions.id]

indexes {
(role_id, permission_id) [pk]
}
}

Table admin_roles {
admin_id bigint [not null, ref: > admins.id]
role_id bigint [not null, ref: > roles.id]

indexes {
(admin_id, role_id) [pk]
}
}

Table categories {
id bigint [pk, increment]
parent_id bigint [ref: > categories.id]
name varchar(150) [not null]
slug varchar(180) [not null, unique]
image varchar(255)
description text
sort_order int [not null, default: 0]
status general_status_enum [not null, default: 'active']
created_at timestamp
updated_at timestamp

indexes {
parent_id [name: 'idx_categories_parent']
slug [name: 'idx_categories_slug']
status [name: 'idx_categories_status']
}
}

Table products {
id bigint [pk, increment]
category_id bigint [ref: > categories.id]
name varchar(255) [not null]
slug varchar(255) [not null, unique]
short_description varchar(500)
description text
ingredients_content text
usage_instructions text
storage_instructions text
warning_text text
origin_country varchar(100)
product_type product_type_enum [not null, default: 'variant']
status product_status_enum [not null, default: 'draft']
is_featured boolean [not null, default: false]
seo_title varchar(255)
seo_description varchar(500)
created_by bigint [ref: > admins.id]
updated_by bigint [ref: > admins.id]
created_at timestamp
updated_at timestamp

indexes {
category_id [name: 'idx_products_category']
slug [name: 'idx_products_slug']
status [name: 'idx_products_status']
is_featured [name: 'idx_products_featured']
}
}

Table product_variants {
id bigint [pk, increment]
product_id bigint [not null, ref: > products.id]
sku varchar(100) [not null, unique]
barcode varchar(100) [unique]
variant_name varchar(255) [not null]
option_summary varchar(255)
volume_ml decimal(10,2)
weight_g decimal(10,2)
cost_price decimal(15,2) [not null, default: 0]
price decimal(15,2) [not null]
compare_at_price decimal(15,2)
status variant_status_enum [not null, default: 'active']
is_default boolean [not null, default: false]
created_at timestamp
updated_at timestamp

indexes {
product_id [name: 'idx_variants_product']
sku [name: 'idx_variants_sku']
barcode [name: 'idx_variants_barcode']
price [name: 'idx_variants_price']
status [name: 'idx_variants_status']
}
}

Table product_images {
id bigint [pk, increment]
product_id bigint [not null, ref: > products.id]
image_url varchar(255) [not null]
alt_text varchar(255)
sort_order int [not null, default: 0]
is_primary boolean [not null, default: false]
created_at timestamp

indexes {
product_id [name: 'idx_product_images_product']
}
}

Table attributes {
id bigint [pk, increment]
name varchar(100) [not null, unique]
created_at timestamp
updated_at timestamp
}

Table attribute_values {
id bigint [pk, increment]
attribute_id bigint [not null, ref: > attributes.id]
value varchar(100) [not null]
created_at timestamp
updated_at timestamp

indexes {
attribute_id [name: 'idx_attribute_values_attribute']
(attribute_id, value) [unique, name: 'uk_attribute_value']
}
}

Table variant_attribute_values {
variant_id bigint [not null, ref: > product_variants.id]
attribute_value_id bigint [not null, ref: > attribute_values.id]

indexes {
(variant_id, attribute_value_id) [pk]
}
}

Table skin_types {
id bigint [pk, increment]
name varchar(100) [not null, unique]
}

Table skin_concerns {
id bigint [pk, increment]
name varchar(100) [not null, unique]
}

Table product_skin_types {
product_id bigint [not null, ref: > products.id]
skin_type_id bigint [not null, ref: > skin_types.id]

indexes {
(product_id, skin_type_id) [pk]
}
}

Table product_skin_concerns {
product_id bigint [not null, ref: > products.id]
skin_concern_id bigint [not null, ref: > skin_concerns.id]

indexes {
(product_id, skin_concern_id) [pk]
}
}

Table warehouses {
id bigint [pk, increment]
name varchar(150) [not null]
code varchar(50) [not null, unique]
address text
created_at timestamp
updated_at timestamp
}

Table inventory {
id bigint [pk, increment]
warehouse_id bigint [not null, ref: > warehouses.id]
variant_id bigint [not null, ref: > product_variants.id]
quantity int [not null, default: 0]
reserved_quantity int [not null, default: 0]
min_stock int [not null, default: 0]

indexes {
warehouse_id [name: 'idx_inventory_warehouse']
variant_id [name: 'idx_inventory_variant']
(warehouse_id, variant_id) [unique, name: 'uk_warehouse_variant']
}
}

Table inventory_transactions {
id bigint [pk, increment]
warehouse_id bigint [not null, ref: > warehouses.id]
variant_id bigint [not null, ref: > product_variants.id]
type inventory_transaction_type_enum [not null]
quantity int [not null]
reference_type varchar(50)
reference_id bigint
note varchar(255)
created_by bigint [ref: > admins.id]
created_at timestamp

indexes {
warehouse_id [name: 'idx_inventory_tx_warehouse']
variant_id [name: 'idx_inventory_tx_variant']
reference_id [name: 'idx_inventory_tx_reference']
}
}

Table carts {
id bigint [pk, increment]
customer_id bigint [ref: > customers.id]
session_token varchar(255) [unique]
created_at timestamp
updated_at timestamp

indexes {
customer_id [name: 'idx_carts_customer']
}
}

Table cart_items {
id bigint [pk, increment]
cart_id bigint [not null, ref: > carts.id]
variant_id bigint [not null, ref: > product_variants.id]
quantity int [not null, default: 1]
created_at timestamp
updated_at timestamp

indexes {
(cart_id, variant_id) [unique, name: 'uk_cart_variant']
}
}

Table wishlists {
id bigint [pk, increment]
customer_id bigint [not null, ref: > customers.id]
created_at timestamp
updated_at timestamp

indexes {
customer_id [name: 'idx_wishlists_customer']
}
}

Table wishlist_items {
id bigint [pk, increment]
wishlist_id bigint [not null, ref: > wishlists.id]
product_id bigint [not null, ref: > products.id]
created_at timestamp

indexes {
(wishlist_id, product_id) [unique, name: 'uk_wishlist_product']
}
}

Table orders {
id bigint [pk, increment]
customer_id bigint [ref: > customers.id]
order_code varchar(50) [not null, unique]

customer_name varchar(150) [not null]
customer_phone varchar(20) [not null]
customer_email varchar(150)

shipping_recipient_name varchar(150) [not null]
shipping_phone varchar(20) [not null]
shipping_province varchar(100) [not null]
shipping_district varchar(100) [not null]
shipping_ward varchar(100) [not null]
shipping_address_line text [not null]

note text

subtotal decimal(15,2) [not null, default: 0]
discount_amount decimal(15,2) [not null, default: 0]
shipping_fee decimal(15,2) [not null, default: 0]
tax_amount decimal(15,2) [not null, default: 0]
grand_total decimal(15,2) [not null, default: 0]

coupon_code varchar(100)

payment_status order_payment_status_enum [not null, default: 'unpaid']
order_status order_status_enum [not null, default: 'pending']

created_at timestamp
updated_at timestamp

indexes {
customer_id [name: 'idx_orders_customer']
order_code [name: 'idx_orders_code']
payment_status [name: 'idx_orders_payment_status']
order_status [name: 'idx_orders_order_status']
created_at [name: 'idx_orders_created_at']
}
}

Table order_items {
id bigint [pk, increment]
order_id bigint [not null, ref: > orders.id]
product_id bigint [not null, ref: > products.id]
variant_id bigint [not null, ref: > product_variants.id]
product_name varchar(255) [not null]
variant_name varchar(255)
sku varchar(100) [not null]
unit_price decimal(15,2) [not null]
compare_at_price decimal(15,2)
discount_amount decimal(15,2) [not null, default: 0]
quantity int [not null]
line_total decimal(15,2) [not null]
created_at timestamp
updated_at timestamp

indexes {
order_id [name: 'idx_order_items_order']
product_id [name: 'idx_order_items_product']
variant_id [name: 'idx_order_items_variant']
}
}

Table order_status_history {
id bigint [pk, increment]
order_id bigint [not null, ref: > orders.id]
old_status varchar(50)
new_status varchar(50) [not null]
note varchar(255)
changed_by bigint [ref: > admins.id]
created_at timestamp

indexes {
order_id [name: 'idx_order_status_history_order']
}
}

Table payments {
id bigint [pk, increment]
order_id bigint [not null, ref: > orders.id]
payment_method payment_method_enum [not null]
amount decimal(15,2) [not null]
status payment_status_enum [not null, default: 'pending']
transaction_code varchar(100)
paid_at timestamp
created_at timestamp
updated_at timestamp

indexes {
order_id [name: 'idx_payments_order']
status [name: 'idx_payments_status']
transaction_code [name: 'idx_payments_transaction_code']
}
}

Table payment_transactions {
id bigint [pk, increment]
payment_id bigint [not null, ref: > payments.id]
gateway varchar(50) [not null]
transaction_ref varchar(150)
transaction_type varchar(50) [not null]
amount decimal(15,2) [not null]
raw_response text
status varchar(50) [not null]
created_at timestamp

indexes {
payment_id [name: 'idx_payment_transactions_payment']
transaction_ref [name: 'idx_payment_transactions_ref']
}
}

Table shipments {
id bigint [pk, increment]
order_id bigint [not null, ref: > orders.id]

shipping_provider varchar(100)
tracking_number varchar(100)
tracking_url varchar(255)

shipping_status shipment_status_enum [not null, default: 'pending_pickup']

carrier_status_code varchar(100)
carrier_status_text varchar(255)
delivery_failed_reason varchar(255)

shipped_at timestamp
delivered_at timestamp
last_tracking_at timestamp

created_at timestamp
updated_at timestamp

indexes {
order_id [name: 'idx_shipments_order']
shipping_status [name: 'idx_shipments_status']
last_tracking_at [name: 'idx_shipments_last_tracking_at']
(shipping_provider, tracking_number) [unique, name: 'uk_shipments_provider_tracking']
}
}

Table shipment_items {
id bigint [pk, increment]
shipment_id bigint [not null, ref: > shipments.id]
order_item_id bigint [not null, ref: > order_items.id]
quantity int [not null]

indexes {
shipment_id [name: 'idx_shipment_items_shipment']
order_item_id [name: 'idx_shipment_items_order_item']
}
}

Table shipment_tracking_events {
id bigint [pk, increment]
shipment_id bigint [not null, ref: > shipments.id]

status_code varchar(100) [not null]
status_text varchar(255) [not null]
substatus_code varchar(100)
substatus_text varchar(255)

location varchar(255)
event_time timestamp
raw_payload text

created_at timestamp

indexes {
shipment_id [name: 'idx_shipment_tracking_events_shipment']
status_code [name: 'idx_shipment_tracking_events_status_code']
event_time [name: 'idx_shipment_tracking_events_event_time']
}
}

Table refunds {
id bigint [pk, increment]
order_id bigint [not null, ref: > orders.id]
payment_id bigint [ref: > payments.id]
refund_code varchar(50) [not null, unique]
amount decimal(15,2) [not null]
reason text
status refund_status_enum [not null, default: 'pending']
created_at timestamp
updated_at timestamp

indexes {
order_id [name: 'idx_refunds_order']
payment_id [name: 'idx_refunds_payment']
refund_code [name: 'idx_refunds_code']
}
}

Table refund_items {
id bigint [pk, increment]
refund_id bigint [not null, ref: > refunds.id]
order_item_id bigint [not null, ref: > order_items.id]
quantity int [not null]
amount decimal(15,2) [not null]

indexes {
refund_id [name: 'idx_refund_items_refund']
order_item_id [name: 'idx_refund_items_order_item']
}
}

Table coupons {
id bigint [pk, increment]
code varchar(100) [not null, unique]
name varchar(150) [not null]
description text
discount_type discount_type_enum [not null]
discount_value decimal(15,2) [not null, default: 0]
min_order_value decimal(15,2)
max_discount_value decimal(15,2)
usage_limit int
usage_limit_per_customer int
start_at timestamp
end_at timestamp
status coupon_status_enum [not null, default: 'active']
created_at timestamp
updated_at timestamp

indexes {
code [name: 'idx_coupons_code']
status [name: 'idx_coupons_status']
}
}

Table coupon_conditions {
id bigint [pk, increment]
coupon_id bigint [not null, ref: > coupons.id]
condition_type coupon_condition_type_enum [not null]
condition_value varchar(255) [not null]

indexes {
coupon_id [name: 'idx_coupon_conditions_coupon']
}
}

Table coupon_usages {
id bigint [pk, increment]
coupon_id bigint [not null, ref: > coupons.id]
customer_id bigint [ref: > customers.id]
order_id bigint [ref: > orders.id]
used_at timestamp

indexes {
coupon_id [name: 'idx_coupon_usages_coupon']
customer_id [name: 'idx_coupon_usages_customer']
order_id [name: 'idx_coupon_usages_order']
}
}

Table reviews {
id bigint [pk, increment]
product_id bigint [not null, ref: > products.id]
customer_id bigint [not null, ref: > customers.id]
order_item_id bigint [ref: > order_items.id]
rating int [not null]
title varchar(255)
content text
is_verified_purchase boolean [not null, default: false]
status review_status_enum [not null, default: 'pending']
created_at timestamp
updated_at timestamp

indexes {
product_id [name: 'idx_reviews_product']
customer_id [name: 'idx_reviews_customer']
status [name: 'idx_reviews_status']
}
}

Table review_images {
id bigint [pk, increment]
review_id bigint [not null, ref: > reviews.id]
image_url varchar(255) [not null]
created_at timestamp

indexes {
review_id [name: 'idx_review_images_review']
}
}

Table banners {
id bigint [pk, increment]
title varchar(255) [not null]
image_url varchar(255) [not null]
link_url varchar(255)
position varchar(100)
sort_order int [not null, default: 0]
status general_status_enum [not null, default: 'active']
created_at timestamp
updated_at timestamp

indexes {
position [name: 'idx_banners_position']
status [name: 'idx_banners_status']
}
}
