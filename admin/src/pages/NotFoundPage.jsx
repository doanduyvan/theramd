import {
  ArrowLeftOutlined,
  DashboardOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Button, Result, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "@/routes/paths";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background: "linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: 760,
          padding: "32px 20px",
          borderRadius: 16,
          background: "#fff",
          boxShadow: "0 20px 60px rgba(15, 23, 42, 0.08)",
          textAlign: "center",
        }}
      >
        <Result
          status="404"
          title={
            <Typography.Title level={1} style={{ margin: 0 }}>
              Không tìm thấy trang
            </Typography.Title>
          }
          subTitle={
            <Typography.Text type="secondary" style={{ fontSize: 16 }}>
              Trang bạn đang truy cập không tồn tại, đã bị xoá hoặc đường dẫn
              không chính xác.
            </Typography.Text>
          }
          extra={
            <Space size="middle" wrap style={{ justifyContent: "center" }}>
              <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
                Quay lại
              </Button>

              <Button icon={<HomeOutlined />}>
                <Link to={PATHS.HOME}>Trang chủ</Link>
              </Button>

              <Button type="primary" icon={<DashboardOutlined />}>
                <Link to={PATHS.DASHBOARD}>Dashboard</Link>
              </Button>
            </Space>
          }
        />
      </section>
    </main>
  );
}
