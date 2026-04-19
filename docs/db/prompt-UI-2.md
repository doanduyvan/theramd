Design a high-fidelity desktop-first ADMIN interface for a premium dermocosmetic / skincare e-commerce business. This prompt is ONLY for the operational admin modules related to product catalog, product variants, inventory, orders, shipment tracking, and order detail workflows. Do not generate a customer storefront. Do not generate a generic startup dashboard. This must feel like a real production-ready back-office tool for an internal operations team.

Overall product and business context:
- Single-brand skincare / dermocosmetic business
- Premium but clinical visual tone
- Internal admin users include: Super Admin, Product Manager, Order Manager, Warehouse Staff, Customer Support
- The admin UI must reflect a real relational database with products, variants, categories, attributes, inventory by warehouse, inventory transactions, orders, order items, payments, shipments, shipment tracking events, refunds, reviews, and admin permissions
- The UI should prioritize speed, accuracy, data density, and operational clarity

Primary design goal:
Create a connected set of admin screens for managing:
1. product list
2. create/edit product
3. product variants
4. attributes and attribute values
5. warehouses
6. inventory
7. inventory transactions
8. orders list
9. order detail
10. shipments list
11. shipment detail
12. shipment tracking events

Visual direction:
- Clean, premium, serious admin UI
- Minimal and elegant, but data-rich
- White / off-white surfaces
- Light gray panels
- Muted blue-green accent color
- Subtle shadows, soft borders
- Strong spacing system
- Modern enterprise SaaS typography
- Calm clinical premium skincare feel
- Avoid playful, bright consumer e-commerce styling
- Use status chips, tables, tabs, drawers, modals, and side panels in a consistent system
- Use a polished desktop admin shell with left sidebar, top header, breadcrumbs, and page-level actions

Layout shell:
- Left sidebar navigation
- Top bar with global search, notifications, admin profile menu, quick actions
- Breadcrumbs under top bar
- Main content area
- Optional right-side drawer for previews and inline editing
- Sticky table headers
- Bulk action bars
- Advanced filter panels
- Empty states, loading states, error states, permission-restricted states

Important domain rules from the system:
- Product is a parent entity
- ProductVariant is the actual sellable unit
- Variant has SKU, barcode, price, cost price, compare-at price, volumeMl, weightG, status, isDefault
- Product has name, slug, category, short description, description, ingredients content, usage instructions, storage instructions, warning text, origin country, featured flag, SEO fields, status
- Product has many images
- Product can be linked to many skin types and skin concerns
- Product variants can be linked to many attribute values
- Inventory is tracked per warehouse + variant
- Inventory transactions track import, export, adjustment, reservation, release
- Orders contain order items, payment status, order status, shipment records, shipment tracking events, refund records
- Shipment status is separate from order status
- Tracking events are event-driven and should be visible as a timeline
- Admin users have role-based access, so the UI should support view-only vs editable states

Use realistic skincare sample data:
- Product examples: Hydra Barrier Repair Cream, Niacinamide Clarifying Serum, Daily UV Defense SPF 50, BHA Renewal Cleanser, Cica Recovery Gel
- Variant examples: 15ml, 30ml, 50ml, 100ml
- Warehouse examples: Main Warehouse HCM, Warehouse Hanoi, Returns Warehouse
- Shipment providers: GHN, GHTK, Viettel Post, Ninja Van
- Order status examples: pending, confirmed, processing, shipping, completed, cancelled, returned
- Shipment status examples: pending_pickup, pre_transit, in_transit, out_for_delivery, delivered, failed_attempt, exception, returned
- Use realistic tracking timelines and sample notes

Create the following screens in a coherent design system:

SCREEN A — Product list page
This should be one of the main admin pages.
Design a dense but elegant catalog table optimized for product operations.

Page header:
- Title: Products
- Short subtitle explaining this is the product catalog management center
- Primary button: Create Product
- Secondary actions: Export, Bulk Actions
- Breadcrumbs: Admin / Catalog / Products

Top summary cards:
- Total products
- Active products
- Draft products
- Archived products
- Featured products
- Products missing SEO
Use compact KPI cards with subtle icons.

Filter bar:
- Search by name or slug
- Category dropdown
- Status dropdown
- Product type dropdown
- Featured toggle
- Created by dropdown
- More filters button that opens advanced filters panel

Table columns:
- Product image thumbnail
- Product name
- Category
- Product type
- Status chip
- Featured chip
- Variant count
- Created by
- Updated at
- Actions menu
Actions menu should include:
- View detail
- Edit
- Duplicate
- Archive
- Activate / Deactivate
- Preview data

Bulk actions:
- Activate
- Deactivate
- Archive
- Mark as featured
- Remove featured
- Assign category

Table UX:
- Sticky header
- Sortable columns
- Row selection
- Compact row density
- Empty state when no products
- Loading skeletons
- Column visibility selector

Important behavior:
- Clicking product name opens product detail/edit page
- Clicking image opens preview drawer
- Status and featured should be visually scannable at a glance

SCREEN B — Create / Edit product page
This should feel like a real CMS + catalog management page, not a simple form.

Page structure:
- Large page header with product name or “Create Product”
- Save Draft button
- Save Changes button
- Publish / Activate button
- Back to list
- Sticky right summary panel

Main content uses tabs:
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
- Category select
- Product type select
- Status select
- Featured toggle
- Origin country
- Clean grouped layout, two-column form

Tab 2 — Content:
- Short description
- Description rich text editor
- Ingredients content rich text editor
- Usage instructions rich text editor
- Storage instructions textarea
- Warning text textarea
Use a premium content editor look, suitable for long skincare product content.

Tab 3 — Media:
- Product images uploader
- Drag and drop upload zone
- Image grid with reorder support
- Set primary image action
- Delete image action
- Image metadata preview
Use real product image placeholders that look premium and clinical.

Tab 4 — Variants:
- Embedded variants table for this product
- Add variant button
- Show variant name, SKU, price, volume, default badge, status, inventory summary
- Allow opening a drawer/modal to create or edit variant
- Allow choosing default variant

Tab 5 — Skin Targeting:
- Multi-select skin types
- Multi-select skin concerns
- Show helper text such as “used for filtering and merchandising in admin and storefront logic”

Tab 6 — SEO:
- SEO title
- SEO description
- Character count helper
- Search preview component

Tab 7 — Audit / Metadata:
- Created by
- Updated by
- Created at
- Updated at
- Read-only system info

Sticky right summary panel:
- Publish status
- Featured status
- Number of images
- Number of variants
- SEO completion
- Content completion score
- Last updated info

Important product page UX:
- Must feel rich, serious, and production-grade
- Long form should still feel organized and easy to scan
- Use sticky save bar if helpful
- Include inline validation
- Include unsaved changes warning concept
- Include destructive action zone separately for archive or delete

SCREEN C — Variants list page
Dedicated page for all variants across catalog.

Page header:
- Title: Variants
- Create Variant button
- Breadcrumbs: Admin / Catalog / Variants

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
- Warehouse stock condition filter

Table columns:
- Variant name
- Product name
- SKU
- Barcode
- Volume (ml)
- Weight (g)
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

Important:
- This page should feel especially useful for operations and catalog team
- The table should be very scannable and SKU-centric
- Inventory total should stand out visually

SCREEN D — Variant editor drawer or page
Design a refined variant editor.

Fields:
- Product selector
- Variant name
- SKU
- Barcode
- Option summary
- Volume ml
- Weight g
- Cost price
- Price
- Compare-at price
- Status
- Is default toggle
- Attribute values selector

Layout:
- Left side: editable form
- Right side: live variant summary card
- Bottom section: related inventory summary and recent order usage

Right summary card should show:
- Product name
- Variant name
- SKU
- Pricing snapshot
- Status chip
- Default badge
- Attribute chips
- Current inventory total

SCREEN E — Attributes and attribute values page
Use a master-detail layout.

Left panel:
- List of attributes
- Search attributes
- Add attribute button
- Attribute rows show name and number of values

Right panel:
- Selected attribute detail
- Attribute values table
- Columns: value, usage count in variants, created date
- Add value button
- Rename / delete value actions

Interaction:
- Selecting an attribute refreshes right panel
- Empty state if no attribute selected
- Use a very clean and structured information architecture

SCREEN F — Warehouses list page
Page header:
- Title: Warehouses
- Create Warehouse button

Table columns:
- Name
- Code
- Address
- Number of variants stocked
- Total quantity
- Actions

Actions:
- View inventory
- Edit warehouse

Design notes:
- Keep it simple and operational
- This page should feel lighter than orders or products

SCREEN G — Inventory list page
This is a critical operations page.

Page header:
- Title: Inventory
- Action buttons: Adjust Stock, Export
- Breadcrumbs: Admin / Inventory / Stock

Top summary cards:
- Total SKUs in stock
- Low stock count
- Out of stock count
- Reserved quantity total
- Total warehouses involved

Filter bar:
- Warehouse
- Product
- Variant
- SKU search
- Low stock only
- Out of stock only

Table columns:
- Warehouse
- Product
- Variant
- SKU
- Quantity
- Reserved quantity
- Available quantity (computed)
- Min stock
- Stock health
- Actions

Actions:
- Adjust stock
- Reserve / Release
- Open transaction history
- View variant

Visual requirements:
- Strong color-coded stock health indicators
- Available quantity should be visually emphasized
- Low stock rows may have subtle warning highlight

SCREEN H — Inventory transaction history page
Technical but user-friendly.

Table columns:
- Date/time
- Warehouse
- Product
- Variant
- SKU
- Transaction type
- Quantity
- Reference type
- Reference ID
- Created by
- Note

Filters:
- Date range
- Warehouse
- Transaction type
- SKU / product search
- Created by

Visual design:
- Use clear status chips for transaction type
- import = success tone
- export = neutral/dark tone
- adjustment = warning tone
- reservation = blue tone
- release = purple or muted info tone

Include:
- Transaction detail drawer
- Reference context preview
- Export button

SCREEN I — Orders list page
This page should be highly operational and triage-focused.

Page header:
- Title: Orders
- Subtitle: Manage order flow from confirmation to shipping and completion
- Export button
- Bulk actions button

Top summary KPI row:
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
- Coupon applied yes/no

Table columns:
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

Important design behavior:
- Make order status and payment status visually easy to distinguish
- Show shipping state as related but separate
- This page should support fast decision-making by order managers

SCREEN J — Order detail page
This is one of the most important screens.
Design it as a rich modular detail page with multiple panels.

Header area:
- Order code
- Order status chip
- Payment status chip
- Main actions: confirm, mark processing, create shipment, view payment, create refund
- Warning badge if invalid state or shipment issue exists

Main content layout:
Use a two-column or hybrid modular layout.

Section 1 — Customer summary card
- Name
- Email
- Phone
- Link to customer detail

Section 2 — Shipping address card
- Recipient
- Phone
- Province / district / ward
- Address line

Section 3 — Order items table
Columns:
- Product image
- Product name
- Variant name
- SKU
- Quantity
- Unit price
- Discount
- Line total

Section 4 — Payment panel
- Payment records
- Payment method
- Amount
- Status
- Transaction code
- Paid at
- Link to payment transactions

Section 5 — Shipment panel
- Shipping provider
- Tracking number
- Tracking URL
- Shipment status
- Carrier status text
- Shipped at
- Delivered at
- Last tracking at
- Delivery failed reason if exists

Section 6 — Shipment tracking timeline
- Chronological events
- status code
- status text
- substatus
- location
- event time
Use a timeline UI, not just a plain table.

Section 7 — Refund panel
- Refund summary if any
- Refund items
- Refund status
- Amount
- Reason

Section 8 — Order status history timeline
- old status
- new status
- changed by
- created at
- note

Section 9 — Internal notes / operator notes
- simple note list or note panel concept

Important order logic the UI should reflect:
- Admin may manually move order from pending -> confirmed -> processing
- After shipment exists, the system should visually emphasize shipment tracking rather than constant manual order status editing
- Delivered shipment should visually imply order completion flow
- Invalid transitions should show warning or disabled actions
- Shipment and order states must be clearly separated in UI

SCREEN K — Shipments list page
Page header:
- Title: Shipments
- Subtitle: Track fulfillment and carrier state
- Actions: Export, Refresh tracking

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

Table columns:
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

Important:
- Make shipment status highly visible
- Exception and failed rows should stand out
- Tracking number should be easy to copy

SCREEN L — Shipment detail page
Design a detailed shipment page.

Header:
- Shipment status chip
- Tracking number
- Shipping provider
- Order code link

Main sections:
1. Shipment summary
2. Linked order summary
3. Tracking info card
4. Shipment items table
5. Latest carrier status panel
6. Delivery failure reason if any
7. Tracking event timeline

Tracking event timeline should feel real:
- Pre transit
- In transit
- Arrived at sorting center
- Out for delivery
- Delivered
- Failed attempt
- Returned
Use realistic event wording.

SCREEN M — Shipment tracking events page
This can be a table + timeline hybrid.

Columns:
- Event time
- Status code
- Status text
- Substatus code
- Substatus text
- Location
- Raw payload preview

Features:
- Filter by shipment
- Filter by status code
- Right-side drawer with raw payload JSON preview
- Timeline summary view option

Output quality requirements:
- All screens must feel like the same design system
- Use realistic operational tables and forms
- Prioritize product, inventory, and order operations
- Make the admin feel fast and production-ready
- Do not simplify this into a generic dashboard
- Make interactions and layouts believable for a serious internal skincare e-commerce admin

Please generate:
- a polished app shell
- the full connected set of screens above
- realistic sample data
- premium but practical admin UX
- strong visual consistency
- rich tables, detail pages, drawers, filters, chips, and timelines