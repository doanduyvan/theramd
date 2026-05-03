import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  EyeOutlined,
  QrcodeOutlined,
  ReloadOutlined,
  SyncOutlined,
} from "@ant-design/icons";
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
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  function handleScanQr(order) {
    navigate(`/orders/${order.id}/qr-scan`, {
      state: { order },
    });
  }

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
      title: "",
      width: "auto",
      fixed: isMobile ? false : "right",
      render: (_, order) => (
        <Button
          type="primary"
          icon={<QrcodeOutlined />}
          onClick={() => handleScanQr(order)}
        ></Button>
      ),
    },
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
      // width: 220,
      fixed: isMobile ? false : "right",
      render: (_, order) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => setSelectedOrder(order)}
          >
            Chi tiết
          </Button>
        </Space>
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
