import { Spin, Typography } from "antd";

export default function FullPageLoading({ text = "Đang xử lý..." }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255, 255, 255, 0.72)",
        backdropFilter: "blur(2px)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Spin size="large" />
        <Typography.Text strong>{text}</Typography.Text>
      </div>
    </div>
  );
}
