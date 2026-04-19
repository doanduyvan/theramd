Design a high-fidelity web admin dashboard for a dermocosmetic / skincare e-commerce system. This is an ADMIN PANEL only, not a customer storefront. The product catalog is for a single skincare brand, with products, variants, warehouses, inventory, orders, shipping tracking, refunds, coupons, reviews, banners, and a full RBAC admin permission system.

Primary goal:
Create a professional, scalable, enterprise-style admin interface that helps internal staff manage products, orders, shipments, inventory, customers, reviews, coupons, and admin permissions efficiently. The UI should feel clean, modern, premium, trustworthy, operational, data-heavy but still easy to scan. The visual tone should match a premium dermatology-inspired cosmetics brand: minimal, structured, calm, clinical, polished, slightly luxurious, not flashy.

User roles in the admin:
- Super Admin
- Product Manager
- Order Manager
- Warehouse Staff
- Customer Support Staff
- Marketing Staff

Important UX principles:
- Desktop-first responsive admin UI optimized for 1440px width, with good behavior on 1280px and tablet landscape.
- Clear information density: professional SaaS back-office style.
- Strong hierarchy, spacious layout, soft neutral palette, subtle borders, premium skincare vibe.
- Use role-aware navigation and permission-aware actions.
- Focus on productivity: filters, saved views, bulk actions, inline status updates where appropriate.
- Design every key screen as a realistic working admin system, not just a pretty concept.
- Use realistic sample data for skincare products, variants, coupons, orders, shipping events, inventory movements, and reviews.

Design language and style:
- Premium admin dashboard for a single-brand cosmetics business.
- Clean white / off-white base, cool gray surfaces, soft blue-green accents, muted success/warning/error chips.
- Rounded but not playful; sharp enough for operations.
- Use consistent cards, tabs, data tables, side panels, drawers, confirmation dialogs, status badges, segmented controls, breadcrumbs.
- Avoid consumer-commerce aesthetics; this is operational software.
- Tables should be elegant, compact, and very readable.
- Use charts only where they genuinely help dashboard comprehension.
- Include empty states, loading states, success states, error states, destructive confirmation states, permission denied states.

Global application shell:
Design the following app frame:
- Left sidebar navigation with collapsible sections
- Top header with search, notifications, current workspace/store, quick create button, current admin profile menu
- Breadcrumbs under header
- Main content area with page title, contextual actions, filters, content panels
- Right-side slide-over drawers for quick detail previews where useful
- Consistent modal system for create/edit/delete/confirm flows

Sidebar navigation structure:
1. Dashboard
2. Catalog
   - Categories
   - Products
   - Variants
   - Attributes
   - Skin Types
   - Skin Concerns
   - Banners
3. Inventory
   - Warehouses
   - Inventory
   - Inventory Transactions
4. Sales
   - Orders
   - Payments
   - Shipments
   - Tracking Events
   - Refunds
   - Coupons
5. Customers
   - Customers
   - Addresses
   - Carts
   - Wishlists
   - Reviews
6. Admin & Access
   - Admin Users
   - Roles
   - Permissions
7. Settings / Logs (lightweight placeholder section if needed)

Data model the UI must reflect:
- customers
- customer_addresses
- admins
- roles
- permissions
- role_permissions
- admin_roles
- categories
- products
- product_variants
- product_images
- attributes
- attribute_values
- variant_attribute_values
- skin_types
- skin_concerns
- product_skin_types
- product_skin_concerns
- warehouses
- inventory
- inventory_transactions
- carts
- cart_items
- wishlists
- wishlist_items
- orders
- order_items
- order_status_history
- payments
- payment_transactions
- shipments
- shipment_items
- shipment_tracking_events
- refunds
- refund_items
- coupons
- coupon_conditions
- coupon_usages
- reviews
- review_images
- banners

Enums and statuses the UI must visibly support:
- customer status: active, inactive, banned
- admin status: active, inactive, blocked
- product status: draft, active, inactive, archived
- product type: simple, variant
- variant status: active, inactive
- order payment status: unpaid, partial, paid, failed, refunded, partially_refunded
- order status: pending, confirmed, processing, shipping, completed, cancelled, returned
- payment status: pending, paid, failed, cancelled, refunded, partially_refunded
- shipment status: pending_pickup, pre_transit, in_transit, out_for_delivery, delivered, failed_attempt, exception, returned, unknown
- refund status: pending, approved, rejected, completed
- review status: pending, approved, rejected
- coupon status: active, inactive
- discount type: percent, fixed_order, fixed_product, free_shipping
- coupon condition type: category, product, first_order
- inventory transaction type: import, export, adjustment, reservation, release

Generate the following screens and flows in one coherent admin system:

SCREEN 1 — Login / Admin authentication
- Elegant, minimal admin login page
- Email, password, remember me
- Clean premium brand feel
- Optional illustration or geometric panel on one side
- Error state for invalid credentials
- “Forgot password” link
- Use a secure and serious visual tone

SCREEN 2 — Main dashboard overview
Create a true operations dashboard with:
- KPI cards: total orders today, revenue today, unpaid orders, orders awaiting processing, low stock variants, shipments in transit, delivered today, pending refunds, pending reviews
- Order status distribution chart
- Payment status chart
- Shipment status chart
- Low stock alert list
- Recent orders table
- Recent shipment tracking events feed
- Recent reviews awaiting moderation
- Top-selling products and top-selling variants
- Quick actions: create product, add inventory transaction, create coupon, view pending orders
- Date range filter at top
- Show dashboard as a command center, not as a marketing dashboard

SCREEN 3 — Admin users list
Data table for admins with:
- Avatar
- Full name
- Email
- Phone
- Status chip
- Roles assigned
- Last login
- Created date
- Actions: view, edit, activate/deactivate, assign roles
Include:
- Search
- Status filter
- Role filter
- Bulk actions
- Create admin button

SCREEN 4 — Admin user detail / edit
Split layout with:
- Basic profile card
- Account status
- Assigned roles
- Effective permissions preview
- Audit-like activity summary
- Save / deactivate actions
Use tabs:
- Profile
- Roles
- Permission preview

SCREEN 5 — Roles management
Show role list with:
- Name
- Code
- Description
- Number of admins using role
- Number of permissions
Actions:
- Create role
- Edit role
- Clone role
- Delete role
Role detail screen:
- Left column: basic info
- Right column: permissions matrix grouped by module
Modules:
- catalog
- orders
- customers
- inventory
- coupons
- reviews
- admins
Permission UI:
- checkbox matrix
- “select all in module”
- “view only / full access” helper patterns if useful

SCREEN 6 — Permissions catalog
Read-only or lightly editable list of all permissions:
- Name
- Code
- Module
- Description
- Roles using this permission

SCREEN 7 — Customers list
Data table with:
- Full name
- Email
- Phone
- Status
- Number of orders
- Total spent
- Last order date
- Account created date
- Actions: view, view orders, view addresses, ban/unban
Filters:
- search
- status
- date created
- order count / customer tier
Customer detail:
- Profile summary
- Addresses
- Order history
- Cart snapshot
- Wishlist snapshot
- Reviews posted

SCREEN 8 — Categories management
Tree + table hybrid interface:
- Parent/child category structure
- Name
- Slug
- Status
- Sort order
- Product count
- Image thumbnail
Actions:
- create child category
- edit
- reorder
- activate/deactivate
Create/edit form:
- name
- slug
- parent category
- image upload
- description
- sort order
- status

SCREEN 9 — Products list
This must be one of the most detailed screens.
Columns:
- Product image
- Product name
- Category
- Product type
- Status
- Featured
- Variant count
- Created by
- Updated date
- Actions
Filters:
- search by name/slug
- category
- status
- featured
- product type
- created by
Bulk actions:
- activate
- deactivate
- archive
- assign category
- mark featured
Actions:
- create product
- duplicate product
- edit product
- preview product data

SCREEN 10 — Create / Edit product
Create a rich multi-tab form with a serious admin UX.
Tabs:
1. Basic Info
   - name
   - slug
   - category
   - product type
   - status
   - featured
   - origin country
2. Content
   - short description
   - description (rich text)
   - ingredients content (rich text / markdown style editor)
   - usage instructions (rich text)
   - storage instructions
   - warning text
3. Media
   - product images gallery
   - drag-and-drop upload
   - set primary image
   - sort images
4. Variants
   - variants table inside product editor
   - add variant button
   - default variant selection
5. Skin Targeting
   - assign skin types
   - assign skin concerns
6. SEO
   - seo title
   - seo description
7. Metadata / audit
   - created by
   - updated by
   - created date
   - updated date

Important:
- This page should feel like a real CMS + catalog editor.
- Use a sticky right summary panel showing current publish status, product completeness score, number of images, number of variants, SEO completion.
- For product variants, support inline editing plus drawer/modal editing.

SCREEN 11 — Variants list
Dedicated table for all variants across all products.
Columns:
- Variant name
- Product name
- SKU
- Barcode
- Volume ml
- Weight g
- Cost price
- Price
- Compare at price
- Status
- Default variant
- Linked attributes summary
- Inventory total
Filters:
- search by SKU / barcode / product
- product
- status
- warehouse stock status
- default / non-default
Actions:
- edit
- duplicate
- disable
- view inventory
- view order usage

SCREEN 12 — Variant editor
Fields:
- product
- variant name
- SKU
- barcode
- option summary
- volume ml
- weight g
- cost price
- price
- compare at price
- status
- is default
- assign attribute values
UI pattern:
- left: editable form
- right: generated preview summary card
- bottom: linked inventory info and recent order usage

SCREEN 13 — Attributes and attribute values
Two-level management UI:
- left panel: attributes list
- right panel: values of selected attribute
For attributes:
- name
- created date
For attribute values:
- value
- usage count in variants
Actions:
- add attribute
- add value
- rename
- delete
Use a master-detail layout

SCREEN 14 — Skin types and skin concerns
Simple management screens:
- list view
- create/edit modal
- usage count across products
This should be very clean and lightweight.

SCREEN 15 — Warehouses list
Columns:
- name
- code
- address
- total variants stocked
- total quantity
Actions:
- view inventory
- create warehouse
- edit warehouse

SCREEN 16 — Inventory list
Show inventory at warehouse + variant level.
Columns:
- Warehouse
- Product
- Variant
- SKU
- Quantity
- Reserved quantity
- Available quantity (computed)
- Min stock
- Stock health indicator
Filters:
- warehouse
- product
- variant
- low stock only
- out of stock only
Actions:
- adjust stock
- reserve/release
- open transaction history
Use sticky summary chips at top:
- total SKUs in stock
- low stock count
- out of stock count

SCREEN 17 — Inventory transactions
Data table:
- Date/time
- Warehouse
- Variant
- SKU
- Transaction type
- Quantity
- Reference type
- Reference ID
- Created by
- Note
Filters:
- date range
- warehouse
- transaction type
- product / SKU
- created by
Use color-coded transaction type chips

SCREEN 18 — Orders list
This is a critical screen.
Columns:
- Order code
- Customer
- Total
- Payment status
- Order status
- Shipment status summary
- Item count
- Coupon code
- Created date
- Actions
Filters:
- order code / customer / phone search
- order status
- payment status
- shipment status
- date range
- coupon applied
Bulk actions:
- confirm orders
- mark processing
- export
- assign fulfillment batch (visual concept only)
Top KPI row:
- pending
- confirmed
- processing
- shipping
- completed
- cancelled
Design should prioritize fast order triage.

SCREEN 19 — Order detail
Rich, operational detail page with modular layout:
Header:
- order code
- order status chip
- payment status chip
- primary actions
Sections:
1. Customer summary
2. Shipping address
3. Order items table
   - product image
   - product name
   - variant name
   - SKU
   - quantity
   - unit price
   - discount
   - line total
4. Payment panel
   - payment records
   - transaction code
   - payment history
5. Shipment panel
   - shipping provider
   - tracking number
   - tracking URL
   - shipment status
   - delivered/shipped timestamps
6. Tracking timeline
   - chronological shipment tracking events
7. Refund panel
   - refund summary
   - refund items
8. Order status history timeline
9. Notes / internal comments panel

Important interactions:
- allow admin to manually change order status from pending to confirmed to processing
- once shipping exists, emphasize shipment tracking rather than manual status micromanagement
- show warning if trying to perform an invalid status transition

SCREEN 20 — Payments list
Columns:
- Order code
- Payment method
- Amount
- Status
- Transaction code
- Paid at
- Created at
Actions:
- view payment
- view payment transactions
Filters:
- status
- payment method
- date range
- order code

SCREEN 21 — Payment transactions
Technical log view:
- Gateway
- Transaction reference
- Transaction type
- Amount
- Status
- Raw response preview
- Created at
This can be more technical, optimized for debugging.

SCREEN 22 — Shipments list
Columns:
- Order code
- Shipping provider
- Tracking number
- Shipment status
- Carrier status text
- Last tracking at
- Shipped at
- Delivered at
Actions:
- open shipment detail
- open tracking events
- copy tracking number
- open tracking URL
Filters:
- shipping provider
- shipment status
- date range
- exception only
Top summary:
- pending pickup
- in transit
- out for delivery
- delivered
- failed / exception
- returned

SCREEN 23 — Shipment detail
Layout:
- shipment summary card
- linked order card
- carrier info
- tracking number and tracking URL
- shipment items table
- shipment timeline / tracking events
- latest carrier status
- delivery failure reason if any
- internal actions like resend tracking request / refresh status (conceptual button)
Make this page feel operational and event-driven.

SCREEN 24 — Shipment tracking events
A timeline-heavy page or hybrid table/timeline:
- event time
- status code
- status text
- substatus code
- substatus text
- location
- raw payload preview
Filters:
- shipment
- event time
- status code
Support a right-side JSON payload preview drawer

SCREEN 25 — Refunds list
Columns:
- Refund code
- Order code
- Payment reference
- Amount
- Status
- Reason
- Created at
Actions:
- review
- approve
- reject
- complete
Filters:
- status
- amount range
- date range

SCREEN 26 — Refund detail
Sections:
- refund summary
- related order summary
- related payment summary
- refund items table
- reason and internal notes
- status progression controls
- timeline/history if useful

SCREEN 27 — Coupons list
Columns:
- Code
- Name
- Discount type
- Discount value
- Status
- Start / end date
- Usage limit
- Used count
- Actions
Filters:
- status
- active now
- discount type
- date range
Actions:
- create
- duplicate
- deactivate

SCREEN 28 — Coupon create / edit
Form sections:
1. Basic info
   - code
   - name
   - description
2. Discount
   - discount type
   - discount value
   - min order value
   - max discount value
3. Usage limits
   - usage limit
   - usage limit per customer
4. Schedule
   - start at
   - end at
   - status
5. Conditions
   - condition type
   - condition value
   - repeatable condition rows
6. Usage analytics preview
   - total uses
   - recent usage
Use a practical form builder style UI.

SCREEN 29 — Customers carts and wishlists
These can be simpler analytical/read-only admin pages.
For carts:
- customer
- session token
- last updated
- item count
- cart detail drawer
For wishlists:
- customer
- product count
- last updated
- detail view of products saved

SCREEN 30 — Reviews moderation
Columns:
- Product
- Customer
- Rating
- Title
- Verified purchase
- Status
- Created at
Actions:
- approve
- reject
- open detail
Review detail:
- review content
- images
- linked product
- linked customer
- linked order item if exists

SCREEN 31 — Banners management
Columns / cards:
- title
- image preview
- link URL
- position
- sort order
- status
Actions:
- create
- edit
- reorder
- activate/deactivate
Banner form:
- title
- image upload
- link URL
- position
- sort order
- status

Cross-screen interaction rules:
- Clicking a customer name from an order opens customer detail
- Clicking a product/variant from order or inventory opens the related product/variant detail
- Clicking shipment from order opens shipment detail
- Clicking payment from order opens payment detail
- Clicking refund from order opens refund detail
- Clicking role from admin detail opens role detail
- Use breadcrumbs to preserve hierarchy

Permission-aware behavior:
- Show action buttons conditionally based on role/permission
- Some users can view but not edit
- Some users can manage orders but not admin settings
- Some users can manage inventory but not products
Design subtle “restricted action” states for users without permission

Table design requirements:
- Sticky table header
- Optional row selection
- Bulk actions bar appears only when rows selected
- Advanced filters in a collapsible filter panel
- Column visibility control
- Export button where relevant
- Compact pagination footer with page size switcher
- Empty state that explains what the page is for
- Skeleton loading states

Form design requirements:
- Use grouped sections and tabs for long forms
- Save draft / save changes / publish patterns where relevant
- Inline validation and helper text
- Destructive actions separated visually
- Confirm dialogs for delete, archive, deactivate, reject
- Allow image upload interfaces for product images, review images, banners

Visual details:
- Use status chips consistently for every enum-like field
- Use premium skincare product placeholder images and realistic product names
- Use muted clinical colors and subtle shadows
- Use cards with clean spacing, not loud dashboard cards
- Use modern type scale suitable for enterprise SaaS
- Important pages should feel fast and scannable

Data realism:
Use realistic fake sample content for:
- product names: serum, cleanser, moisturizer, sunscreen, treatment gel, toner
- variant names and sizes: 15ml, 30ml, 50ml, 100ml
- coupon codes
- shipping providers and tracking numbers
- review content
- admin names and customer names
- warehouse names
- inventory quantities
- shipment tracking events like pre-transit, in transit, out for delivery, delivered, failed attempt, returned

Output requirements:
- Generate a complete, coherent admin design system and connected multi-screen flow
- Show both list pages and detail pages
- Include navigation, tables, forms, dashboards, drawers, modals, timelines, tabs, filters, and status chips
- Keep the experience realistic for an internal operations team
- Prioritize usability and information architecture over visual experimentation
- Do not generate a customer-facing storefront
- Do not generate a generic startup dashboard unrelated to this database
- Make the admin feel production-ready for a cosmetics e-commerce business

Please create:
- a polished admin app shell
- a dashboard
- the full set of core admin screens described above
- realistic data-rich layouts
- clear design consistency across all modules
- strong operational UX for order, inventory, shipment, and product management