Câu khóa nên lặp lại ở đầu prompt:
Keep the existing admin app shell exactly the same.
Do not redesign the header, sidebar, topbar, breadcrumb style, spacing system, color palette, typography, navigation structure, or global layout.
Only redesign the main content area of this page.
Preserve the same design system, same component language, same card style, same table style, same form style, and same interaction patterns as the existing screens.

Câu khóa mạnh hơn nếu Stitch vẫn hay đổi layout:
This is a refinement of an existing admin project, not a new app.
Keep the current shell locked.
Do not regenerate the sidebar or header.
Only update the page body for the specific screen below.

Quy trình nên làm với Stitch
Bước 1: tạo “master shell” trước

Prompt đầu tiên chỉ để ra:

sidebar
top header
breadcrumb
content container
card system
table style
filter bar style
form style
status chip style
modal/drawer style

Không yêu cầu quá nhiều màn.

Bước 2: sau khi shell ổn

Mỗi lần chỉ prompt:

1 màn duy nhất
1 mục tiêu rõ
1 loại layout chính

Ví dụ:

Products list
Product edit
Variants list
Inventory list
Orders list
Order detail
Bước 3: sau khi ra màn

Dùng prompt refine ngắn:

tăng mật độ table
giảm chiều cao card
làm nổi status
giữ shell nguyên

Google mô tả Stitch hỗ trợ refine nhanh và update theo ngữ cảnh hiện có, nên cách “generate lớn một lần rồi refine nhỏ” là hợp lý hơn là nhồi toàn bộ hệ thống vào 1 prompt.

Bộ prompt chia nhỏ – sẵn để copy

Dưới đây tôi viết theo kiểu:

Prompt 0: tạo shell
Prompt 1 trở đi: từng trang
mỗi prompt đều có phần khóa shell

Prompt 0 — Tạo master shell cho admin

Design a high-fidelity desktop-first admin app shell for a premium dermocosmetic / skincare e-commerce business.

This is an INTERNAL ADMIN PANEL, not a customer storefront.

Important:
Create only the global admin shell and one simple placeholder content page.
Do not try to design the whole system yet.
The goal of this prompt is to establish a stable shared layout and design system that will be reused for all later screens.

Business context:
- Single-brand skincare / dermocosmetic e-commerce business
- Premium, clinical, trustworthy, operational
- Users include Super Admin, Product Manager, Order Manager, Warehouse Staff, Customer Support, Marketing Staff

Visual direction:
- White / off-white base
- Cool gray surfaces
- Soft blue-green accent
- Premium, clinical, clean, calm
- Enterprise SaaS admin feel
- Structured, minimal, data-friendly
- Not flashy, not playful, not consumer-commerce style

Create:
1. Left sidebar navigation
2. Top header bar
3. Breadcrumb area
4. Main content container
5. Shared card system
6. Shared table design language
7. Shared filter bar design language
8. Shared form field design language
9. Shared modal and drawer design language
10. Shared status chip design language

Sidebar navigation:
- Dashboard
- Catalog
  - Categories
  - Products
  - Variants
  - Attributes
  - Skin Types
  - Skin Concerns
  - Banners
- Inventory
  - Warehouses
  - Inventory
  - Inventory Transactions
- Sales
  - Orders
  - Payments
  - Shipments
  - Tracking Events
  - Refunds
  - Coupons
- Customers
  - Customers
  - Addresses
  - Carts
  - Wishlists
  - Reviews
- Admin & Access
  - Admin Users
  - Roles
  - Permissions

Top header:
- Global search
- Notifications
- Workspace/store switcher
- Quick create button
- Admin profile menu

Design requirements:
- Desktop-first, optimized for 1440px
- Collapsible sidebar
- Sticky top header
- Elegant spacing
- Clean typography hierarchy
- Premium but practical
- Good for dense operations pages

For the placeholder page body:
- Use a simple dashboard placeholder with 4 KPI cards and 1 example table
- This placeholder page exists only to demonstrate the shell and component language

Most important rule:
This prompt is only for establishing the permanent admin shell and component language.
Make the shell reusable for later screens.
Do not redesign everything as separate unrelated pages.
Create a consistent admin framework that later prompts can build on.


# Prompt dùng lại để khóa shell cho tất cả các màn sau

Bạn copy đoạn này đặt lên đầu mọi prompt sau:
Keep the existing admin app shell exactly the same.
Do not redesign the sidebar, top header, breadcrumb style, spacing system, color palette, typography, navigation, or global layout.
Do not create a new app shell.
This is a refinement inside the same admin project.
Only design the main content area for the specific page below.
Use the exact same design system, table style, card style, filter style, chip style, modal style, and drawer style already established.

Prompt 1 — Dashboard

Keep the existing admin app shell exactly the same.
Do not redesign the sidebar, top header, breadcrumb style, spacing system, color palette, typography, navigation, or global layout.
Do not create a new app shell.
This is a refinement inside the same admin project.
Only design the main content area for the Dashboard page.
Use the exact same design system, table style, card style, filter style, chip style, modal style, and drawer style already established.

Design the Dashboard page for a premium skincare e-commerce admin.

Goal:
Create a true operations dashboard, not a marketing landing page.

Page title:
Dashboard

Page subtitle:
Operational overview for orders, inventory, shipments, and moderation.

Top controls:
- Date range picker
- Quick filters: Today, 7 days, 30 days
- Refresh button
- Quick actions dropdown

Top KPI cards:
- Orders today
- Revenue today
- Pending orders
- Low stock variants
- Shipments in transit
- Delivered today
- Pending refunds
- Pending reviews

Middle section:
- Order status distribution chart
- Payment status summary chart
- Shipment status summary chart

Operational widgets:
- Low stock alert table
- Recent orders table
- Recent shipment tracking events feed
- Reviews waiting moderation
- Top selling products and top selling variants

Design requirements:
- Make the page feel like a command center
- Compact, scannable, elegant
- Use status chips consistently
- Prioritize table readability over oversized cards
- Charts should be clean and not flashy
- Show realistic skincare data and operational numbers

Interactions:
- Clicking a recent order opens order detail
- Clicking a low stock item opens variant or inventory detail
- Clicking a shipment event opens shipment detail
- Clicking a pending review opens review moderation detail

Prompt 2 — Products list

Keep the existing admin app shell exactly the same.
Do not redesign the sidebar, top header, breadcrumb style, spacing system, color palette, typography, navigation, or global layout.
Do not create a new app shell.
This is a refinement inside the same admin project.
Only design the main content area for the Products page.
Use the exact same design system, table style, card style, filter style, chip style, modal style, and drawer style already established.

Design the Products list page for a premium skincare e-commerce admin.

Page title:
Products

Page subtitle:
Manage the product catalog for a single-brand dermocosmetic business.

Header actions:
- Create Product
- Export
- Bulk Actions

Top summary cards:
- Total products
- Active products
- Draft products
- Archived products
- Featured products
- Products missing SEO

Filter bar:
- Search by product name or slug
- Category filter
- Status filter
- Product type filter
- Featured toggle
- Created by filter
- Advanced filters button

Main table columns:
- Product image
- Product name
- Category
- Product type
- Status
- Featured
- Variant count
- Created by
- Updated at
- Actions

Actions menu:
- View
- Edit
- Duplicate
- Archive
- Activate / Deactivate
- Preview data

Bulk actions:
- Activate
- Deactivate
- Archive
- Mark featured
- Remove featured
- Assign category

Design requirements:
- Dense but premium table
- Sticky table header
- Row selection
- Column sorting
- Column visibility control
- Collapsible advanced filters panel
- Empty state
- Loading skeleton state

Visual emphasis:
- Status and featured chips must be quickly scannable
- Product name and image area should feel polished
- Product image thumbnails should look like premium skincare items

Interaction:
- Clicking product name opens product edit page
- Clicking image opens preview drawer

Prompt 3 — Product create/edit page

Keep the existing admin app shell exactly the same.
Do not redesign the sidebar, top header, breadcrumb style, spacing system, color palette, typography, navigation, or global layout.
Do not create a new app shell.
This is a refinement inside the same admin project.
Only design the main content area for the Product create/edit page.
Use the exact same design system, table style, card style, filter style, chip style, modal style, and drawer style already established.

Design a high-fidelity Product create/edit page for a premium skincare admin panel.

Goal:
This page should feel like a serious CMS + catalog editor.

Page header:
- Product name or “Create Product”
- Save Draft
- Save Changes
- Publish / Activate
- Back to Products

Main layout:
- Large main content area
- Sticky right summary panel

Use tabs:
1. Basic Info
2. Content
3. Media
4. Variants
5. Skin Targeting
6. SEO
7. Audit / Metadata

Tab 1 — Basic Info:
- Product name
- Slug
- Category
- Product type
- Status
- Featured toggle
- Origin country

Tab 2 — Content:
- Short description
- Description rich text editor
- Ingredients content rich text editor
- Usage instructions rich text editor
- Storage instructions textarea
- Warning text textarea

Tab 3 — Media:
- Drag and drop image uploader
- Product images gallery
- Reorder images
- Set primary image
- Delete image

Tab 4 — Variants:
- Embedded variants table
- Add variant button
- Show variant name, SKU, price, volume, default, status, inventory summary
- Open variant edit drawer from this tab

Tab 5 — Skin Targeting:
- Multi-select skin types
- Multi-select skin concerns

Tab 6 — SEO:
- SEO title
- SEO description
- Character count
- Search preview

Tab 7 — Audit:
- Created by
- Updated by
- Created at
- Updated at
- Read-only system info

Sticky right summary panel:
- Publish status
- Featured status
- Image count
- Variant count
- SEO completion
- Content completeness score
- Last updated information

Design requirements:
- Very organized long-form admin page
- Premium editorial feel but operational
- Strong section hierarchy
- Inline validation
- Sticky save area if useful
- Clear destructive zone for archive/delete

Prompt 4 — Variants list

Keep the existing admin app shell exactly the same.
Do not redesign the sidebar, top header, breadcrumb style, spacing system, color palette, typography, navigation, or global layout.
Do not create a new app shell.
This is a refinement inside the same admin project.
Only design the main content area for the Variants page.
Use the exact same design system, table style, card style, filter style, chip style, modal style, and drawer style already established.

Design the Variants list page for a premium skincare admin.

Page title:
Variants

Page subtitle:
Manage sellable variants across the product catalog.

Header actions:
- Create Variant
- Export

Top summary cards:
- Total variants
- Active variants
- Default variants
- Low stock variants
- Out of stock variants

Filter bar:
- Search by SKU, barcode, product name, variant name
- Product filter
- Status filter
- Default variant filter
- Warehouse stock filter

Main table columns:
- Variant name
- Product name
- SKU
- Barcode
- Volume ml
- Weight g
- Cost price
- Price
- Compare-at price
- Status
- Default badge
- Attribute summary
- Inventory total
- Actions

Actions:
- Edit
- Duplicate
- Disable
- View inventory
- View order usage

Design requirements:
- SKU-first operational page
- Dense but elegant table
- Inventory total should stand out clearly
- Low stock and out-of-stock states should be obvious

Prompt 5 — Inventory list

Keep the existing admin app shell exactly the same.
Do not redesign the sidebar, top header, breadcrumb style, spacing system, color palette, typography, navigation, or global layout.
Do not create a new app shell.
This is a refinement inside the same admin project.
Only design the main content area for the Inventory page.
Use the exact same design system, table style, card style, filter style, chip style, modal style, and drawer style already established.

Design the Inventory list page for warehouse and stock operations.

Page title:
Inventory

Page subtitle:
Track stock by warehouse and product variant.

Header actions:
- Adjust Stock
- Export

Top summary cards:
- Total SKUs in stock
- Low stock count
- Out of stock count
- Reserved quantity total
- Warehouses in use

Filter bar:
- Warehouse filter
- Product filter
- Variant filter
- SKU search
- Low stock only
- Out of stock only

Main table columns:
- Warehouse
- Product
- Variant
- SKU
- Quantity
- Reserved quantity
- Available quantity
- Min stock
- Stock health
- Actions

Actions:
- Adjust stock
- Reserve / Release
- View transaction history
- Open variant

Design requirements:
- Strong operational feel
- Available quantity should be visually emphasized
- Stock health uses subtle but clear color indicators
- Warning highlight for low stock rows
- Fast scanning for warehouse staff

Prompt 6 — Orders list

Keep the existing admin app shell exactly the same.
Do not redesign the sidebar, top header, breadcrumb style, spacing system, color palette, typography, navigation, or global layout.
Do not create a new app shell.
This is a refinement inside the same admin project.
Only design the main content area for the Orders page.
Use the exact same design system, table style, card style, filter style, chip style, modal style, and drawer style already established.

Design the Orders list page for a premium skincare e-commerce admin.

Page title:
Orders

Page subtitle:
Manage order flow from confirmation to shipping and completion.

Header actions:
- Export
- Bulk actions

Top KPI row:
- Pending
- Confirmed
- Processing
- Shipping
- Completed
- Cancelled
- Returned

Filter bar:
- Search by order code, customer name, phone
- Order status
- Payment status
- Shipment status
- Date range
- Coupon applied filter

Main table columns:
- Order code
- Customer
- Total
- Payment status
- Order status
- Shipment status summary
- Item count
- Coupon code
- Created at
- Actions

Actions:
- Open order
- Confirm order
- Mark processing
- Open shipment
- Export order

Design requirements:
- This page is for fast triage
- Order status and payment status must be visually distinct
- Shipment state must be visible but secondary to order workflow
- Strong table readability
- Compact professional layout

Prompt 7 — Order detail

Keep the existing admin app shell exactly the same.
Do not redesign the sidebar, top header, breadcrumb style, spacing system, color palette, typography, navigation, or global layout.
Do not create a new app shell.
This is a refinement inside the same admin project.
Only design the main content area for the Order detail page.
Use the exact same design system, table style, card style, filter style, chip style, modal style, and drawer style already established.

Design a rich Order detail page for an internal skincare e-commerce admin.

Page header:
- Order code
- Order status chip
- Payment status chip
- Main actions: confirm, mark processing, create shipment, view payment, create refund

Main content layout:
Use a structured modular page with multiple panels.

Sections:
1. Customer summary card
   - name
   - email
   - phone
   - link to customer detail

2. Shipping address card
   - recipient
   - phone
   - province / district / ward
   - address line

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
   - payment method
   - amount
   - status
   - transaction code
   - paid at
   - payment history

5. Shipment panel
   - provider
   - tracking number
   - tracking URL
   - shipment status
   - carrier status text
   - shipped at
   - delivered at
   - last tracking at
   - delivery failed reason

6. Shipment tracking timeline
   - chronological events
   - location
   - status
   - timestamp

7. Refund panel
   - refund summary
   - refund items
   - refund status
   - reason

8. Order status history
   - old status
   - new status
   - changed by
   - created at
   - note

9. Internal notes area

Design requirements:
- This page must feel operational and trustworthy
- Separate order state from shipment state clearly
- After shipment exists, visually emphasize shipment tracking
- Invalid actions should appear disabled or warning-based
- Timelines should be clear and elegant

Prompt 8 — Shipments list

Keep the existing admin app shell exactly the same.
Do not redesign the sidebar, top header, breadcrumb style, spacing system, color palette, typography, navigation, or global layout.
Do not create a new app shell.
This is a refinement inside the same admin project.
Only design the main content area for the Shipments page.
Use the exact same design system, table style, card style, filter style, chip style, modal style, and drawer style already established.

Design the Shipments list page for tracking operational fulfillment.

Page title:
Shipments

Page subtitle:
Monitor carrier movement and delivery progress.

Header actions:
- Export
- Refresh tracking

Top summary cards:
- Pending pickup
- In transit
- Out for delivery
- Delivered
- Failed / exception
- Returned

Filter bar:
- Shipping provider
- Shipment status
- Date range
- Exception only
- Tracking number search

Main table columns:
- Order code
- Shipping provider
- Tracking number
- Shipment status
- Carrier status text
- Last tracking at
- Shipped at
- Delivered at
- Actions

Actions:
- Open shipment
- Copy tracking number
- Open tracking URL
- View tracking events
- Refresh status

Design requirements:
- Shipment status must be highly visible
- Exception rows should stand out
- Tracking number should be copy-friendly
- Operations-focused, not decorative  

Prompt 9 — Shipment detail

Keep the existing admin app shell exactly the same.
Do not redesign the sidebar, top header, breadcrumbs, global spacing, typography, color palette, status chip style, table style, card style, filter style, modal style, or drawer style.
Do not generate a new app shell.
This is a refinement inside the same existing admin project.
Only design the main content area for the Shipment detail page below.
Preserve the current visual design system and component language exactly.

Design a high-fidelity Shipment Detail page for an internal premium skincare e-commerce admin panel.

Page goal:
Help operations staff quickly understand one shipment, its linked order, its shipment items, its latest carrier state, and its full tracking event history.

Business context:
- A shipment belongs to an order
- Shipment fields include:
  - shipping provider
  - tracking number
  - tracking URL
  - shipment status
  - carrier status code
  - carrier status text
  - delivery failed reason
  - shipped at
  - delivered at
  - last tracking at
- Shipment has many shipment items
- Shipment has many shipment tracking events
- Shipment status is separate from order status
- This is an operational page, not a customer-facing tracking page

Page title:
Shipment Detail

Breadcrumb:
Admin / Sales / Shipments / Shipment Detail

Header area:
- Shipment status chip
- Tracking number displayed prominently
- Shipping provider
- Linked order code
- Copy tracking number action
- Open tracking URL action
- Refresh tracking action
- Optional secondary action: View order

Main page layout:
Use a structured multi-panel detail page with two-column hierarchy or modular cards.

Section 1 — Shipment summary card
- Shipping provider
- Tracking number
- Tracking URL
- Shipment status
- Carrier status code
- Carrier status text
- Last tracking at
- Shipped at
- Delivered at
- Delivery failed reason if present
Design note:
- Shipment status must be visually strong
- If status is failed_attempt, exception, or returned, the card should subtly emphasize the issue

Section 2 — Linked order summary card
- Order code
- Order status
- Payment status
- Customer name
- Customer phone
- Order total
- Item count
- Link to order detail

Section 3 — Shipment items table
Columns:
- Product image
- Product name
- Variant name
- SKU
- Quantity
- Linked order item reference
Design note:
- Compact and readable
- Make it easy to verify exactly what was shipped

Section 4 — Latest carrier state panel
- Current normalized shipment status
- Raw carrier status code
- Raw carrier status text
- Last event time
- Last known location
- Delivery failure reason if any
- Operational hint text such as “carrier reports package is in transit” or “delivery attempt failed”
Design note:
- This panel should feel event-driven and useful for support staff

Section 5 — Tracking timeline
Create a rich vertical timeline showing shipment tracking events in chronological order.
Each event item should include:
- Status text
- Substatus text if available
- Event time
- Location
- Small status chip
- Optional raw payload preview action
Use realistic examples like:
- Pre transit
- Accepted by carrier
- Arrived at sorting center
- In transit
- Out for delivery
- Delivered
- Failed attempt
- Returned
Design note:
- Timeline should be elegant and operational
- Make timestamps easy to scan
- Show event grouping if multiple events occur on the same date

Section 6 — Operational action area
Include conceptual admin actions:
- Refresh tracking
- Copy tracking number
- Open carrier tracking URL
- View all tracking events
- View linked order
These should look realistic but not overpower the main page

Sidebar or right panel (optional):
- Quick shipment metadata
- Tags such as provider, shipment status, issue state
- Last sync info
- Internal support note placeholder

Important visual rules:
- Prioritize clarity over decoration
- Keep this page professional and trustworthy
- Do not make it look like a customer shipment tracking page
- Make exception states visible but still elegant
- Keep card spacing and table density consistent with the existing admin design

Use realistic sample data:
- shipping provider: GHN or GHTK or Viettel Post
- tracking number with realistic pattern
- shipment statuses like in_transit, out_for_delivery, delivered, failed_attempt
- product examples from skincare catalog
- event timeline entries with realistic timestamps and sorting center locations

Prompt 10 — Tracking events

Keep the existing admin app shell exactly the same.
Do not redesign the sidebar, top header, breadcrumbs, global spacing, typography, color palette, status chip style, table style, card style, filter style, modal style, or drawer style.
Do not generate a new app shell.
This is a refinement inside the same existing admin project.
Only design the main content area for the Shipment Tracking Events page below.
Preserve the current visual design system and component language exactly.

Design a high-fidelity Shipment Tracking Events page for an internal operations admin panel.

Page goal:
Provide a technical but usable view of all shipment tracking events, with filters, table readability, and raw event inspection.

Page title:
Shipment Tracking Events

Breadcrumb:
Admin / Sales / Tracking Events

Header actions:
- Export
- Refresh tracking data
- Toggle timeline view
- Toggle compact view

Top summary chips or compact KPI cards:
- Total events
- Events today
- Exception events
- Delivered events
- Returned events

Filter bar:
- Shipment selector
- Tracking number search
- Order code search
- Status code filter
- Date range
- Provider filter
- Exception only toggle

Main table columns:
- Event time
- Status code
- Status text
- Substatus code
- Substatus text
- Location
- Shipment / tracking number
- Linked order
- Actions

Actions:
- View raw payload
- Open shipment
- Open linked order

Table behavior:
- Sticky header
- Dense layout
- Sort by event time descending by default
- Column visibility control
- Advanced filters drawer
- Row click opens side drawer

Right-side drawer:
When a row is clicked, open a payload inspection drawer containing:
- Event summary
- Raw JSON payload preview
- Shipment summary
- Linked order summary
- Copy raw payload action
- Copy event code action

Alternative layout section:
Provide an optional secondary “timeline mode” toggle that transforms the content into a grouped timeline by shipment or by day.
Keep the table as the main default mode.

Design requirements:
- This page should feel more technical than products or orders
- Still keep the premium admin visual language
- Make logs readable, not intimidating
- Use subtle color coding for different status types
- Avoid visual clutter

Use realistic event examples:
- PRE_TRANSIT
- IN_TRANSIT
- OUT_FOR_DELIVERY
- DELIVERED
- FAILED_ATTEMPT
- RETURNED
- EXCEPTION
Include realistic timestamps, city names, and carrier wording

Prompt 11 — Customers list

Keep the existing admin app shell exactly the same.
Do not redesign the sidebar, top header, breadcrumbs, global spacing, typography, color palette, status chip style, table style, card style, filter style, modal style, or drawer style.
Do not generate a new app shell.
This is a refinement inside the same existing admin project.
Only design the main content area for the Customers page below.
Preserve the current visual design system and component language exactly.

Design a high-fidelity Customers list page for a premium skincare e-commerce admin panel.

Page goal:
Help support and operations staff understand customer accounts, order value, engagement, and service status.

Page title:
Customers

Breadcrumb:
Admin / Customers / Customers

Header actions:
- Export
- Bulk actions

Top summary cards:
- Total customers
- Active customers
- Inactive customers
- Banned customers
- New customers this month
- VIP / high-spend customers

Filter bar:
- Search by name, email, phone
- Status filter
- Date created filter
- Customer tier filter
- Orders count filter
- Total spend range
- Has reviews toggle
- Has active cart toggle

Main table columns:
- Customer
- Email
- Phone
- Status
- Orders count
- Total spent
- Last order date
- Account created date
- Actions

Actions:
- View customer
- View orders
- View addresses
- View cart
- View wishlist
- Ban / unban
- Export customer data

Visual requirements:
- Customer name cell should include avatar placeholder and clear identity info
- Total spent should be visually prominent but not flashy
- Status should be easy to scan
- Table should feel premium and operational

Optional right preview drawer when row is clicked:
- Customer profile summary
- Recent orders
- Saved addresses count
- Wishlist count
- Cart snapshot
- Last activity

Important:
- This is not CRM sales software
- It is an e-commerce operations/admin customer page
- Keep layout practical, clear, and efficient

Prompt 12 — Customer detail

Keep the existing admin app shell exactly the same.
Do not redesign the sidebar, top header, breadcrumbs, global spacing, typography, color palette, status chip style, table style, card style, filter style, modal style, or drawer style.
Do not generate a new app shell.
This is a refinement inside the same existing admin project.
Only design the main content area for the Customer detail page below.
Preserve the current visual design system and component language exactly.

Design a high-fidelity Customer Detail page for a premium skincare e-commerce admin panel.

Page goal:
Provide a full view of one customer account, including profile, addresses, order history, carts, wishlists, and reviews.

Page title:
Customer Detail

Breadcrumb:
Admin / Customers / Customers / Customer Detail

Header area:
- Customer name
- Status chip
- Email
- Phone
- Main actions: view orders, ban/unban, export data

Main layout:
Use a modular page with strong information hierarchy.

Section 1 — Profile summary card
- Full name
- Email
- Phone
- Gender
- Birth date
- Account status
- Email verified at
- Last login at
- Created at
Design note:
- Clean profile card, not social-media style

Section 2 — Addresses panel
Display saved addresses as cards or compact table.
Fields:
- Recipient name
- Recipient phone
- Province / district / ward
- Address line
- Default badge

Section 3 — Order history
Table columns:
- Order code
- Created at
- Order status
- Payment status
- Total
- Shipment status summary
- Actions
Actions:
- Open order

Section 4 — Cart snapshot
Show current cart if exists:
- Last updated
- Session token if relevant
- Item count
- List of current variants in cart
Design note:
- This can be a compact operational card

Section 5 — Wishlist snapshot
- Number of saved products
- Product thumbnails or compact list
- Last updated

Section 6 — Reviews posted
Table or card list:
- Product
- Rating
- Title
- Status
- Created at
- Link to review moderation

Section 7 — Customer value / service summary
Small analytical panel:
- Total orders
- Total spent
- Average order value
- Last order date
- Review count

Important design requirements:
- Keep the page practical and support-friendly
- Make linked orders easy to access
- Use tabs if needed, but keep navigation simple
- Profile should not overshadow operational data

Prompt 13 — Roles management

Keep the existing admin app shell exactly the same.
Do not redesign the sidebar, top header, breadcrumbs, global spacing, typography, color palette, status chip style, table style, card style, filter style, modal style, or drawer style.
Do not generate a new app shell.
This is a refinement inside the same existing admin project.
Only design the main content area for the Roles management page below.
Preserve the current visual design system and component language exactly.

Design a high-fidelity Roles management page for an admin RBAC system inside a skincare e-commerce admin panel.

Page goal:
Allow super admins to manage roles and assign permissions in a clear, scalable way.

Page title:
Roles

Breadcrumb:
Admin / Admin & Access / Roles

Header actions:
- Create Role
- Export

Top summary cards:
- Total roles
- Active admin users
- Roles with full access
- Roles with catalog access
- Roles with order access

Main layout:
Use a split layout or list-to-detail layout.

Left area — Roles list:
Columns:
- Role name
- Code
- Description
- Number of admins
- Number of permissions
- Actions

Actions:
- View
- Edit
- Clone role
- Delete role

Right area or detail panel — Role detail:
When a role is selected, show:
- Role name
- Role code
- Description
- Number of assigned admins
- Number of permissions
- Save changes button

Permissions matrix:
Group permissions by module:
- catalog
- inventory
- orders
- customers
- reviews
- coupons
- admins
For each permission group, show:
- view
- create
- update
- delete
- approve / manage where relevant

Interaction design:
- Checkbox matrix
- “Select all in module”
- “Clear module”
- Optional helper presets like view-only, editor, manager

Additional detail section:
- Admin users assigned to this role
- Last updated
- Risk level badge for highly privileged roles

Design requirements:
- Make RBAC understandable, not intimidating
- Clean enterprise access-control feel
- Permission matrix should be structured and readable
- This page should feel serious and secure

Prompt 14 — Permissions catalog

Keep the existing admin app shell exactly the same.
Do not redesign the sidebar, top header, breadcrumbs, global spacing, typography, color palette, status chip style, table style, card style, filter style, modal style, or drawer style.
Do not generate a new app shell.
This is a refinement inside the same existing admin project.
Only design the main content area for the Permissions page below.
Preserve the current visual design system and component language exactly.

Design a high-fidelity Permissions catalog page for an RBAC admin system.

Page goal:
Provide a clear reference of all permissions in the system and how they are used.

Page title:
Permissions

Breadcrumb:
Admin / Admin & Access / Permissions

Header actions:
- Export
- Create Permission if needed, but keep this page mostly reference-oriented

Top summary cards:
- Total permissions
- Modules covered
- Roles using permissions
- Unused permissions if any

Filter bar:
- Search by permission name or code
- Module filter
- Used by role filter
- Unused only toggle

Main table columns:
- Permission name
- Permission code
- Module
- Description
- Roles using this permission
- Actions

Actions:
- View detail
- Edit description
- View roles using this permission

Right-side detail drawer when row clicked:
- Permission name
- Permission code
- Module
- Description
- Roles using this permission
- Related screens or feature areas
- Risk level / sensitivity note

Design requirements:
- More reference-oriented than Roles page
- Clear structure
- Strong table readability
- Keep it technical but accessible
- Use subtle module chips for grouping

Prompt 15 — Reviews moderation

Keep the existing admin app shell exactly the same.
Do not redesign the sidebar, top header, breadcrumbs, global spacing, typography, color palette, status chip style, table style, card style, filter style, modal style, or drawer style.
Do not generate a new app shell.
This is a refinement inside the same existing admin project.
Only design the main content area for the Reviews moderation page below.
Preserve the current visual design system and component language exactly.

Design a high-fidelity Reviews Moderation page for a premium skincare e-commerce admin panel.

Page goal:
Help support or content moderators review, approve, reject, and inspect product reviews efficiently.

Page title:
Reviews Moderation

Breadcrumb:
Admin / Customers / Reviews

Header actions:
- Export
- Bulk approve
- Bulk reject

Top summary cards:
- Pending reviews
- Approved reviews
- Rejected reviews
- Verified purchase reviews
- Reviews with images

Filter bar:
- Search by product, customer, or title
- Status filter
- Rating filter
- Verified purchase toggle
- Has images toggle
- Date range

Main table columns:
- Product
- Customer
- Rating
- Title
- Verified purchase
- Status
- Created at
- Actions

Actions:
- Approve
- Reject
- Open detail

Review detail panel or page:
When a review is opened, show:
1. Review summary
   - rating
   - title
   - content
   - status
   - created at

2. Linked product summary
   - image
   - product name
   - variant or order item if available

3. Linked customer summary
   - customer name
   - email
   - link to customer detail

4. Verification context
   - is verified purchase
   - linked order item if exists

5. Review images gallery
   - thumbnails
   - enlarged preview

6. Moderation actions
   - approve
   - reject
   - internal note
   - optional moderation reason

Design requirements:
- Moderation workflow should feel fast and practical
- Pending reviews should stand out clearly
- Rating and verification state should be easy to scan
- Review content should remain highly readable
- This page should feel like internal moderation software, not a public reviews page