import { useState } from "react";
import {
  Button,
  Descriptions,
  Empty,
  Modal,
  Space,
  Table,
  Tag,
  Typography,
  Grid,
} from "antd";
import { EyeOutlined, ReloadOutlined, SyncOutlined } from "@ant-design/icons";
import useOrders from "../hooks/useOrders";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

function formatPrice(value) {
  if (value === null || value === undefined || value === "") return "N/A";

  return Number(value).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}

function formatDate(value) {
  if (!value) return "N/A";

  return new Date(value).toLocaleString("vi-VN");
}

function getOrderFields(order) {
  return order?.full_fields || {};
}

function getCustomerName(order) {
  const fields = getOrderFields(order);
  const address = fields?.shipping_address;
  const customer = fields?.customer;

  return (
    address?.name ||
    `${customer?.last_name || ""} ${customer?.first_name || ""}`.trim() ||
    "N/A"
  );
}

function getLineItems(order) {
  const fields = getOrderFields(order);

  return Array.isArray(fields?.line_items) ? fields.line_items : [];
}

export default function Orders() {
  const {
    orders,
    pagination,
    handleTableChange,
    isLoading,
    getOrders,
    syncOrders,
  } = useOrders();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const itemColumns = [
    {
      title: "Sản phẩm",
      dataIndex: "title",
      key: "title",
      render: (value, item) => value || item?.name || "N/A",
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      render: (value) => value || "N/A",
    },
    {
      title: "SL",
      dataIndex: "quantity",
      key: "quantity",
      width: 80,
      render: (value) => value ?? 0,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 140,
      render: formatPrice,
    },
    {
      title: "Thành tiền",
      dataIndex: "original_total",
      key: "original_total",
      width: 160,
      render: formatPrice,
    },
  ];

  const columns = [
    {
      title: "Đơn hàng",
      key: "order",
      width: 180,
      render: (_, order) => {
        const fields = getOrderFields(order);

        return (
          <div>
            <Text strong>{fields?.name || `#${order?.id_sapo}`}</Text>
            <Text type="secondary" style={{ display: "block", fontSize: 12 }}>
              Sapo ID: {order?.id_sapo || "N/A"}
            </Text>
          </div>
        );
      },
    },
    {
      title: "Khách hàng",
      key: "customer",
      width: 240,
      render: (_, order) => (
        <div>
          <Text>{getCustomerName(order)}</Text>
          <Text type="secondary" style={{ display: "block", fontSize: 12 }}>
            {order?.phone || order?.email || "Không có liên hệ"}
          </Text>
        </div>
      ),
    },
    {
      title: "Tổng tiền",
      key: "total_price",
      width: 150,
      render: (_, order) => formatPrice(getOrderFields(order)?.total_price),
    },
    {
      title: "Thanh toán",
      key: "financial_status",
      width: 130,
      render: (_, order) => getOrderFields(order)?.financial_status || "N/A",
    },
    {
      title: "Giao hàng",
      key: "fulfillment_status",
      width: 130,
      render: (_, order) => getOrderFields(order)?.fulfillment_status || "N/A",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 130,
      render: (status) => (
        <Tag color={status === "closed" ? "green" : "default"}>
          {status || "unknown"}
        </Tag>
      ),
    },
    {
      title: "Ngày tạo",
      key: "created_on",
      width: 180,
      render: (_, order) => formatDate(getOrderFields(order)?.created_on),
    },
    {
      title: "",
      key: "action",
      width: 110,
      fixed: isMobile ? false : "right",
      render: (_, order) => (
        <Button icon={<EyeOutlined />} onClick={() => setSelectedOrder(order)}>
          Chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Space
        align={isMobile ? "start" : "center"}
        orientation={isMobile ? "vertical" : "horizontal"}
        style={{
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <div>
          <Title level={3} style={{ marginBottom: 4 }}>
            Đơn hàng
          </Title>
          <Text type="secondary">Danh sách đơn hàng đồng bộ từ Sapo</Text>
        </div>

        <Space wrap>
          <Button icon={<ReloadOutlined />} onClick={() => getOrders()}>
            Tải lại
          </Button>

          <Button
            type="primary"
            icon={<SyncOutlined />}
            onClick={() => syncOrders()}
          >
            Đồng bộ đơn hàng
          </Button>
        </Space>
      </Space>

      <Table
        rowKey={(record) => record?.id || record?.id_sapo}
        loading={isLoading}
        columns={columns}
        dataSource={Array.isArray(orders) ? orders : []}
        scroll={{ x: 1210 }}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
        locale={{
          emptyText: <Empty description="Chưa có đơn hàng nào" />,
        }}
      />

      <Modal
        title="Chi tiết đơn hàng"
        open={Boolean(selectedOrder)}
        onCancel={() => setSelectedOrder(null)}
        footer={null}
        width={1000}
      >
        {selectedOrder && (
          <Space orientation="vertical" size={16} style={{ width: "100%" }}>
            <Descriptions bordered column={isMobile ? 1 : 2} size="small">
              <Descriptions.Item label="Mã đơn">
                {getOrderFields(selectedOrder)?.name || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Sapo ID">
                {selectedOrder?.id_sapo || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Khách hàng">
                {getCustomerName(selectedOrder)}
              </Descriptions.Item>
              <Descriptions.Item label="Liên hệ">
                {selectedOrder?.phone || selectedOrder?.email || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Tổng tiền">
                {formatPrice(getOrderFields(selectedOrder)?.total_price)}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày tạo">
                {formatDate(getOrderFields(selectedOrder)?.created_on)}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                {selectedOrder?.status || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Thanh toán">
                {getOrderFields(selectedOrder)?.financial_status || "N/A"}
              </Descriptions.Item>
            </Descriptions>

            <div>
              <Title level={5}>Sản phẩm trong đơn</Title>
              <Table
                rowKey={(record) => record?.id || record?.sku}
                columns={itemColumns}
                dataSource={getLineItems(selectedOrder)}
                pagination={false}
                size="small"
                scroll={{ x: 760 }}
                locale={{
                  emptyText: <Empty description="Chưa có sản phẩm" />,
                }}
              />
            </div>
          </Space>
        )}
      </Modal>
    </div>
  );
}

/**
 {

    Code UI phù hợp bạn hãy suy nghĩ thật kĩ trước khi làm, vì đây là dữ liệu được lấy từ Sapo nên tôi chưa chưa xác định được trường nào cần hiển thị trường nào không cần hiển thị, bạn hãy suy nghĩ và đánh giá xem nên hiển thị UI đơn hàng như thế nào cho Admin, tùy bạn chọn.
    dưới đây là cấu trúc từng đối tượng có trong mảng orders.
    và trên UI có phân trang và có button "Đồng bộ đơn hàng", button đồng bộ này hiện tại chỉ cần có UI, tôi chưa sử lí logic nên bỏ qua

    "id": 3,
    "id_sapo": 172260407,
    "email": "foo@example.com",
    "phone": null,
    "status": "closed",
    "full_fields": {
        "id": 172260407,
        "buyer_accepts_marketing": false,
        "cancel_reason": "wrong_item",
        "cancelled_on": "2026-04-30T15:57:12Z",
        "confirmed_on": "2026-04-26T16:01:56Z",
        "cart_token": null,
        "checkout_token": null,
        "closed_on": "2026-04-30T15:57:13Z",
        "created_on": "2026-04-26T16:01:56Z",
        "currency": "VND",
        "email": "foo@example.com",
        "phone": null,
        "customer_group_id": null,
        "fulfillment_status": null,
        "financial_status": "pending",
        "issue_status": "pending",
        "status": "closed",
        "return_status": "no_return",
        "name": "THR11008",
        "note": null,
        "number": 8,
        "order_number": 1008,
        "processed_on": "2026-04-26T16:01:56Z",
        "processing_method": null,
        "source_url": null,
        "source_name": "from api duyvan",
        "source_category": null,
        "source": "a9b1ac1b45d14ea0b159708f84f6d0a1",
        "landing_site": null,
        "landing_site_ref": null,
        "referring_site": null,
        "reference": null,
        "source_identifier": null,
        "gateway": null,
        "token": "0909bf563c3147e08753ae7307bf44a7",
        "total_discounts": 0,
        "total_line_items_price": 781000,
        "total_price": 781000,
        "total_weight": 200,
        "expected_delivery_date": null,
        "modified_on": "2026-04-30T15:57:13Z",
        "tags": "",
        "pay_adjustment_status": null,
        "test": false,
        "completed_on": null,
        "delivered_on": null,
        "shipment_category": null,
        "package_category": "single_item_quantity",
        "shipment_deadline": null,
        "billing_address": null,
        "shipping_address": null,
        "customer": {
            "id": 41722549,
            "state": "disabled",
            "email": "foo@example.com",
            "phone": null,
            "first_name": null,
            "last_name": null,
            "dob": null,
            "gender": "other",
            "verified_email": true,
            "accepts_marketing": false,
            "orders_count": 2,
            "total_spent": 0,
            "last_order_id": 172260407,
            "last_order_name": "THR11008",
            "note": null,
            "tags": "",
            "created_on": "2026-04-26T15:49:09Z",
            "modified_on": "2026-04-26T16:01:58Z",
            "default_address": null
        },
        "user": null,
        "assignee": null,
        "client_details": null,
        "line_items": [
            {
                "id": 287254363,
                "price": 781000,
                "total_discount": 0,
                "discount_code": null,
                "fulfillment_status": null,
                "fulfillable_quantity": 0,
                "quantity": 1,
                "current_quantity": 0,
                "grams": 200,
                "product_id": 79224016,
                "variant_id": 203176045,
                "inventory_item_id": 203176043,
                "product_exists": true,
                "variant_inventory_management": "bizweb",
                "requires_shipping": true,
                "name": "Theramd A.C.N.3+PORE Control - 120ml",
                "title": "Theramd A.C.N.3+PORE Control - 120ml",
                "variant_title": "Default Title",
                "sku": "THERSR-0001",
                "vendor": "Theramd",
                "gift_card": false,
                "properties": [],
                "discount_allocations": [],
                "tax_lines": [],
                "taxable": true,
                "non_fulfillable_quantity": 1,
                "refundable_quantity": 0,
                "restockable": true,
                "discounted_unit_price": 781000,
                "discounted_total": 781000,
                "original_total": 781000,
                "fulfillment_service": "manual",
                "merchant_editable": false,
                "unit": "Chai",
                "catalog_id": null,
                "note": null,
                "vat_pit_category_code": null,
                "deleted": false
            }
        ],
        "shipping_lines": [],
        "fulfillments": [],
        "refunds": [
            {
                "id": 25439084,
                "order_id": 172260407,
                "return_id": null,
                "created_on": "2026-04-30T15:57:12Z",
                "processed_at": "2026-04-30T15:57:12Z",
                "restock": false,
                "user_id": 836897,
                "note": null,
                "transactions": [],
                "refund_line_items": [
                    {
                        "id": 31994918,
                        "quantity": 1,
                        "line_item_id": 287254363,
                        "location_id": 911608,
                        "subtotal": 781000,
                        "total_tax": 0,
                        "restock_type": "no_restock",
                        "line_item": {
                            "id": 287254363,
                            "price": 781000,
                            "total_discount": 0,
                            "discount_code": null,
                            "fulfillment_status": null,
                            "fulfillable_quantity": 0,
                            "quantity": 1,
                            "current_quantity": 0,
                            "grams": 200,
                            "product_id": 79224016,
                            "variant_id": 203176045,
                            "inventory_item_id": 203176043,
                            "product_exists": true,
                            "variant_inventory_management": "bizweb",
                            "requires_shipping": true,
                            "name": "Theramd A.C.N.3+PORE Control - 120ml",
                            "title": "Theramd A.C.N.3+PORE Control - 120ml",
                            "variant_title": "Default Title",
                            "sku": "THERSR-0001",
                            "vendor": "Theramd",
                            "gift_card": false,
                            "properties": [],
                            "taxable": true,
                            "non_fulfillable_quantity": 1,
                            "refundable_quantity": 0,
                            "restockable": true,
                            "discounted_unit_price": 781000,
                            "discounted_total": 781000,
                            "original_total": 781000,
                            "fulfillment_service": "manual",
                            "merchant_editable": false,
                            "unit": "Chai",
                            "catalog_id": null,
                            "note": null,
                            "vat_pit_category_code": null,
                            "deleted": false
                        },
                        "total_cart_discount_amount": 0
                    }
                ],
                "order_adjustments": [],
                "total_refunded": 0
            }
        ],
        "note_attributes": [],
        "discount_codes": [],
        "discount_applications": [],
        "combination_lines": [],
        "app": {
            "id": 13583,
            "key": "a9b1ac1b45d14ea0b159708f84f6d0a1",
            "alias": "test"
        },
        "channel_definition": null,
        "user_id": null,
        "assignee_id": null,
        "location_id": 911608,
        "payment_gateway_names": [],
        "can_mark_as_paid": false,
        "capturable": false,
        "tax_exempt": false,
        "taxes_included": false,
        "tax_lines": [],
        "total_shipping_price": 0,
        "total_tax": 0,
        "original_total_price": 781000,
        "cart_discount_amount": 0,
        "net_payment": 0,
        "unpaid_amount": 0,
        "total_outstanding": 0,
        "total_received": 0,
        "total_refunded": 0,
        "total_refunded_shipping": 0,
        "current_cart_discount_amount": 0,
        "current_total_discounts": 0,
        "current_subtotal_price": 0,
        "current_total_price": 0,
        "current_total_tax": 0,
        "current_discounted_total": 0,
        "current_tax_lines": [],
        "print_count": 0,
        "invoices": [],
        "preorder": false,
        "sla": {
            "fast": null,
            "confirm": null,
            "avoid_cancellation": null
        },
        "feature_version": 4165,
        "can_notify_customer": true,
        "current_total_weight": 0,
        "merchant_editable_errors": null,
        "delivery_time_remaining": null,
        "refundable": false,
        "edited": false,
        "current_subtotal_line_items_quantity": 0,
        "merchant_editable": false,
        "browser_ip": null,
        "subtotal_line_items_quantity": 1,
        "sub_total_price": 781000,
        "subtotal_price": 781000
    },
    "created_at": "2026-05-02T16:20:05.000000Z",
    "updated_at": "2026-05-02T16:20:05.000000Z"
}
 */
