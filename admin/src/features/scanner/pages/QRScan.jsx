import { useEffect, useMemo } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Alert, Button, Empty, Space, Tag, Typography, Grid } from "antd";
import {
  ArrowLeftOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  QrcodeOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PATHS } from "@/routes/paths";
import useQRScan from "../hooks/useQRScan";

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

export default function QRScan() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const location = useLocation();
  const order = location.state?.order;
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const {
    codes,
    paused,
    setPaused,
    scannerRef,
    handleScan,
    handleReset,
    handleError,
    createQR,
  } = useQRScan(orderId, order);

  useEffect(() => {
    if (!order) {
      navigate(PATHS.ORDERS, { replace: true });
    }
  }, [order, navigate]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const fields = useMemo(() => getOrderFields(order), [order]);
  const lineItems = Array.isArray(fields?.line_items) ? fields.line_items : [];
  const scannedCodes = Object.values(codes);

  if (!order) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#fff",
        padding: isMobile ? 12 : 24,
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Space
        orientation={isMobile ? "vertical" : "horizontal"}
        align={isMobile ? "start" : "center"}
        style={{
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(PATHS.ORDERS)}
          >
            Quay lại
          </Button>

          <div>
            <Title level={isMobile ? 4 : 3} style={{ margin: 0 }}>
              Quét QR đơn hàng
            </Title>
            <Text type="secondary">
              Mã đơn: {fields?.name || orderId || `#${order?.id}`}
            </Text>
          </div>
        </Space>
      </Space>
      <div className="flex justify-between items-center pb-2">
        <Tag color={order?.status === "open" ? "green" : "default"}>
          {order?.status || "unknown"}
        </Tag>
        <p>QR đã quét: {scannedCodes.length}</p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "minmax(360px, 520px) 1fr",
          gap: 16,
          alignItems: "start",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            background: "#fff",
            paddingBottom: 12,
          }}
        >
          <div
            ref={scannerRef}
            style={{
              overflow: "hidden",
              borderRadius: 12,
              background: "#000",
              aspectRatio: "1 / 1",
            }}
          >
            <Scanner
              onScan={handleScan}
              onError={handleError}
              constraints={{ facingMode: "environment" }}
              formats={["qr_code"]}
              sound={false}
              paused={paused}
              allowMultiple={true}
              components={{
                finder: true,
                onOff: true,
                audio: false,
                tracker: (detectedCodes, ctx) => {
                  detectedCodes.forEach((code) => {
                    const box = code.boundingBox;

                    ctx.strokeStyle = "#00ff00";
                    ctx.lineWidth = 4;
                    ctx.strokeRect(box.x, box.y, box.width, box.height);
                  });
                },
              }}
            />
          </div>

          <div className="flex justify-between gap-5 pt-5">
            <Button
              block
              type={paused ? "primary" : "default"}
              icon={paused ? <PlayCircleOutlined /> : <PauseCircleOutlined />}
              onClick={() => setPaused((prev) => !prev)}
            >
              {paused ? "Bật camera" : "Tạm dừng"}
            </Button>

            <Button block icon={<ReloadOutlined />} onClick={handleReset}>
              Reset QR
            </Button>

            <Button block type="primary" onClick={createQR}>
              Lưu
            </Button>
          </div>
        </div>

        <Space orientation="vertical" size={12} style={{ width: "100%" }}>
          <Alert
            type="info"
            showIcon
            title={`Đang quét cho đơn ${fields?.name || orderId || "N/A"}`}
            description={`Khách hàng: ${getCustomerName(order)} - SĐT: ${
              order?.phone || fields?.shipping_address?.phone || "N/A"
            }`}
          />

          <div
            style={{
              border: "1px solid #f0f0f0",
              borderRadius: 10,
              padding: 16,
            }}
          >
            <Space orientation="vertical" size={8} style={{ width: "100%" }}>
              <Text strong>Thông tin đơn hàng</Text>

              <div>
                <Text type="secondary">Tổng tiền: </Text>
                <Text strong>{formatPrice(fields?.total_price)}</Text>
              </div>

              <div>
                <Text type="secondary">Ngày tạo: </Text>
                <Text>{formatDate(fields?.created_on)}</Text>
              </div>

              <div>
                <Text type="secondary">Thanh toán: </Text>
                <Text>{fields?.financial_status || "N/A"}</Text>
              </div>

              <div>
                <Text type="secondary">Kênh: </Text>
                <Text>{fields?.source_name || "N/A"}</Text>
              </div>
            </Space>
          </div>

          <div
            style={{
              border: "1px solid #f0f0f0",
              borderRadius: 10,
              padding: 16,
            }}
          >
            <Text strong>Sản phẩm trong đơn</Text>

            {lineItems.length === 0 ? (
              <Empty description="Không có sản phẩm" />
            ) : (
              <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
                {lineItems.map((item) => (
                  <div
                    key={item?.id || item?.sku}
                    style={{
                      paddingBottom: 10,
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    <Text strong>{item?.title || item?.name || "N/A"}</Text>
                    <div>
                      <Text type="secondary">
                        SKU: {item?.sku || "N/A"} - SL: {item?.quantity ?? 0}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            style={{
              border: "1px solid #f0f0f0",
              borderRadius: 10,
              padding: 16,
            }}
          >
            <Space style={{ marginBottom: 8 }}>
              <QrcodeOutlined />
              <Text strong>QR đã quét: {scannedCodes.length}</Text>
            </Space>

            {scannedCodes.length === 0 ? (
              <Empty description="Chưa quét QR nào" />
            ) : (
              <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
                {scannedCodes.map((code) => (
                  <div
                    key={code}
                    style={{
                      padding: "8px 10px",
                      border: "1px solid #f0f0f0",
                      borderRadius: 8,
                      wordBreak: "break-all",
                    }}
                  >
                    {code}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Space>
      </div>
    </div>
  );
}
