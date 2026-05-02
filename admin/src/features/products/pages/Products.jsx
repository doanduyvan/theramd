import { useState } from "react";
import {
  Button,
  Descriptions,
  Empty,
  Image,
  Modal,
  Space,
  Table,
  Tag,
  Typography,
  Grid,
} from "antd";
import { EyeOutlined, ReloadOutlined, SyncOutlined } from "@ant-design/icons";
import useProducts from "../hooks/useProducts";
import FullPageLoading from "@/shared/components/FullPageLoading";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

function formatPrice(value) {
  if (value === null || value === undefined || value === "") return "N/A";

  return Number(value).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}

function getProductImage(product) {
  return product?.image?.src || product?.images?.[0]?.src || "";
}

function getVariants(product) {
  return Array.isArray(product?.variants) ? product.variants : [];
}

function getPriceRange(product) {
  const prices = getVariants(product)
    .map((variant) => Number(variant?.price))
    .filter((price) => Number.isFinite(price));

  if (!prices.length) return "N/A";

  const min = Math.min(...prices);
  const max = Math.max(...prices);

  if (min === max) return formatPrice(min);

  return `${formatPrice(min)} - ${formatPrice(max)}`;
}

function getTotalInventory(product) {
  return getVariants(product).reduce((total, variant) => {
    return total + Number(variant?.inventory_quantity || 0);
  }, 0);
}

export default function Products() {
  const { products, isLoading, getProducts, syncProducts } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const variantColumns = [
    {
      title: "Biến thể",
      dataIndex: "title",
      key: "title",
      render: (value, variant) => value || variant?.option1 || "N/A",
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      render: (value) => value || "N/A",
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      key: "barcode",
      render: (value) => value || "N/A",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: formatPrice,
    },
    {
      title: "Tồn kho",
      dataIndex: "inventory_quantity",
      key: "inventory_quantity",
      render: (value) => value ?? 0,
    },
    {
      title: "Khối lượng",
      key: "weight",
      render: (_, variant) =>
        `${variant?.weight ?? 0} ${variant?.weight_unit || ""}`.trim(),
    },
  ];

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      width: isMobile ? 280 : 460,
      render: (_, product) => {
        const imageUrl = getProductImage(product);
        const variants = getVariants(product);

        return (
          <Space align="start" size={12}>
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={product?.name || "product"}
                width={64}
                height={64}
                style={{
                  objectFit: "cover",
                  borderRadius: 8,
                  border: "1px solid #f0f0f0",
                }}
                preview={false}
              />
            ) : (
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 8,
                  display: "grid",
                  placeItems: "center",
                  background: "#f5f5f5",
                  color: "#999",
                  border: "1px solid #f0f0f0",
                  fontSize: 12,
                }}
              >
                No image
              </div>
            )}

            <div style={{ minWidth: 0 }}>
              <Text strong style={{ display: "block" }}>
                {product?.name || "Chưa có tên"}
              </Text>

              <Text type="secondary" style={{ display: "block", fontSize: 12 }}>
                Sapo ID: {product?.id_sapo || "N/A"}
              </Text>

              <Text type="secondary" style={{ display: "block", fontSize: 12 }}>
                {variants.length} biến thể
              </Text>
            </div>
          </Space>
        );
      },
    },
    {
      title: "Loại",
      dataIndex: "product_type",
      key: "product_type",
      width: 120,
      render: (value) => value || "N/A",
    },
    {
      title: "Khoảng giá",
      key: "price_range",
      width: 220,
      render: (_, product) => getPriceRange(product),
    },
    {
      title: "Tổng tồn",
      key: "inventory_total",
      width: 110,
      render: (_, product) => getTotalInventory(product),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 130,
      render: (status) => (
        <Tag color={status === "active" ? "green" : "default"}>
          {status || "unknown"}
        </Tag>
      ),
    },
    {
      title: "",
      key: "action",
      width: 110,
      fixed: isMobile ? false : "right",
      render: (_, product) => (
        <Button
          icon={<EyeOutlined />}
          onClick={() => setSelectedProduct(product)}
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div>
      {isLoading && <FullPageLoading text="Đang xử lý..." />}

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
            Sản phẩm
          </Title>
          <Text type="secondary">Danh sách sản phẩm đã đồng bộ từ Sapo</Text>
        </div>

        <Space wrap>
          <Button icon={<ReloadOutlined />} onClick={getProducts}>
            Tải lại
          </Button>

          <Button type="primary" icon={<SyncOutlined />} onClick={syncProducts}>
            Đồng bộ Sapo
          </Button>
        </Space>
      </Space>

      <Table
        rowKey={(record) => record?.id || record?.id_sapo}
        loading={isLoading}
        columns={columns}
        dataSource={Array.isArray(products) ? products : []}
        pagination={false}
        scroll={{ x: 1040 }}
        locale={{
          emptyText: <Empty description="Chưa có sản phẩm nào" />,
        }}
      />

      <Modal
        title="Chi tiết sản phẩm"
        open={Boolean(selectedProduct)}
        onCancel={() => setSelectedProduct(null)}
        footer={null}
        width={1000}
      >
        {selectedProduct && (
          <Space orientation="vertical" size={16} style={{ width: "100%" }}>
            <Descriptions bordered column={isMobile ? 1 : 2} size="small">
              <Descriptions.Item label="Tên sản phẩm" span={2}>
                {selectedProduct?.name || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Sapo ID">
                {selectedProduct?.id_sapo || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Alias">
                {selectedProduct?.alias || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Loại">
                {selectedProduct?.product_type || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Tag
                  color={
                    selectedProduct?.status === "active" ? "green" : "default"
                  }
                >
                  {selectedProduct?.status || "unknown"}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Số biến thể">
                {getVariants(selectedProduct).length}
              </Descriptions.Item>
              <Descriptions.Item label="Tổng tồn">
                {getTotalInventory(selectedProduct)}
              </Descriptions.Item>
            </Descriptions>

            <div>
              <Title level={5}>Biến thể</Title>
              <Table
                rowKey={(record) => record?.id || record?.sku}
                columns={variantColumns}
                dataSource={getVariants(selectedProduct)}
                pagination={false}
                size="small"
                scroll={{ x: 760 }}
                locale={{
                  emptyText: <Empty description="Chưa có biến thể" />,
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
   giao diện bạn làm còn thiếu khá nhiều, bạn không thể hiển thị giá trực tiếp như vậy được vì sản phẩm có nhiều biến thể. 
   bạn tạo lại UI phù hợp, có thể hiển thị popup để hiển thị chi tiết sản phẩm và các biến thể
   nếu có gì không hiểu bạn có thể hỏi lại tôi
    {
      "id": 2,
      "id_sapo": 79224015,
      "name": "Theramd Duo Hya Cool B35 Peptide Serum - 30g",
      "alias": "theramd-duo-hya-cool-b35-peptide-serum-30g",
      "product_type": "SR",
      "meta_title": null,
      "meta_description": null,
      "summary": null,
      "content": null,
      "status": "active",
      "images": [],
      "image": null,
      "variants": [
        {
          "id": 203176044,
          "inventory_item_id": 203176042,
          "barcode": "THERSR-0002",
          "sku": "THERSR-0002",
          "price": 690000,
          "compare_at_price": 0,
          "option1": "Phiên bản gốc",
          "option2": null,
          "option3": null,
          "taxable": true,
          "inventory_management": "bizweb",
          "inventory_policy": "deny",
          "inventory_quantity": 0,
          "lot_management": true,
          "requires_shipping": true,
          "weight": 120,
          "weight_unit": "g",
          "unit": "Chai",
          "image_id": null,
          "position": 1,
          "created_on": "2026-04-25T16:25:07Z",
          "modified_on": "2026-05-02T15:34:38Z",
          "title": "Phiên bản gốc",
          "grams": 120,
          "product_id": 79224015,
          "type": "normal",
          "requires_components": false
        },
        {
          "id": 203947073,
          "inventory_item_id": 203947071,
          "barcode": "",
          "sku": "fdf",
          "price": 790000,
          "compare_at_price": null,
          "option1": "20g - Phiên bản gốc",
          "option2": null,
          "option3": null,
          "taxable": true,
          "inventory_management": "bizweb",
          "inventory_policy": "deny",
          "inventory_quantity": 0,
          "lot_management": false,
          "requires_shipping": true,
          "weight": 0,
          "weight_unit": "kg",
          "unit": "20g",
          "image_id": null,
          "position": 2,
          "created_on": "2026-05-02T15:34:39Z",
          "modified_on": "2026-05-02T15:34:39Z",
          "title": "20g - Phiên bản gốc",
          "grams": 0,
          "product_id": 79224015,
          "type": "packsize",
          "requires_components": true
        }
      ],
      "created_at": "2026-05-02T13:38:59.000000Z",
      "updated_at": "2026-05-02T15:35:19.000000Z"
    },

 */
