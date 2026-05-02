import { useMemo, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  AppstoreOutlined,
  BarChartOutlined,
  BellOutlined,
  DashboardOutlined,
  GiftOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Drawer,
  Dropdown,
  Grid,
  Input,
  Layout,
  Menu,
  Space,
  Typography,
  theme,
  Spin,
} from "antd";
import { useLogout } from "@/features/auth/hooks/useLogout";
import FullPageLoading from "@/shared/components/FullPageLoading";
import { useAuthStore } from "@/features/auth/store/authStore";

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const menuItems = [
  {
    key: "/dashboard",
    icon: <DashboardOutlined />,
    label: <Link to="/dashboard">Dashboard</Link>,
  },
  {
    key: "/products",
    icon: <AppstoreOutlined />,
    label: <Link to="/products">Sản phẩm</Link>,
  },
  {
    key: "/orders",
    icon: <ShoppingCartOutlined />,
    label: <Link to="/orders">Đơn hàng</Link>,
  },
  {
    key: "/customers",
    icon: <TeamOutlined />,
    label: <Link to="/customers">Khách hàng</Link>,
  },
  {
    key: "/promotions",
    icon: <GiftOutlined />,
    label: <Link to="/promotions">Khuyến mãi</Link>,
  },
  {
    key: "/reports",
    icon: <BarChartOutlined />,
    label: <Link to="/reports">Báo cáo</Link>,
  },
  {
    key: "/settings",
    icon: <SettingOutlined />,
    label: <Link to="/settings">Cài đặt</Link>,
  },
];

function getSelectedKey(pathname) {
  if (pathname === "/") return "/dashboard";

  const firstPath = `/${pathname.split("/").filter(Boolean)[0]}`;
  return menuItems.some((item) => item.key === firstPath)
    ? firstPath
    : pathname;
}

function getBreadcrumbItems(pathname) {
  const names = {
    dashboard: "Dashboard",
    products: "Sản phẩm",
    orders: "Đơn hàng",
    customers: "Khách hàng",
    promotions: "Khuyến mãi",
    reports: "Báo cáo",
    settings: "Cài đặt",
    profile: "Tài khoản",
  };

  const parts = pathname.split("/").filter(Boolean);

  return [
    { title: <Link to="/dashboard">Admin</Link> },
    ...parts.map((part) => ({ title: names[part] || part })),
  ];
}

function SidebarContent({ collapsed = false, selectedKey, onMenuClick }) {
  return (
    <>
      <Link
        to="/dashboard"
        onClick={onMenuClick}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          height: 64,
          padding: collapsed ? "0 18px" : "0 24px",
          color: "#fff",
          textDecoration: "none",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            display: "grid",
            placeItems: "center",
            background: "#16a34a",
            fontWeight: 700,
          }}
        >
          T
        </div>

        {!collapsed && (
          <Typography.Text style={{ color: "#fff", fontWeight: 700 }}>
            Theramd Admin
          </Typography.Text>
        )}
      </Link>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems}
        onClick={onMenuClick}
        style={{ background: "transparent", borderInlineEnd: 0 }}
      />
    </>
  );
}

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const selectedKey = useMemo(
    () => getSelectedKey(location.pathname),
    [location.pathname],
  );

  const breadcrumbItems = useMemo(
    () => getBreadcrumbItems(location.pathname),
    [location.pathname],
  );

  const { logout, isLoggingOut } = useLogout();

  const user = useAuthStore((state) => state.user);

  const accountItems = [
    { key: "profile", label: <Link to="/profile">Tài khoản</Link> },
    {
      key: "logout",
      danger: true,
      disabled: isLoggingOut,
      label: "Đăng xuất",
    },
  ];

  function handleAccountMenuClick({ key }) {
    if (key === "logout") {
      logout();
    }
  }

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f7fb" }}>
      {isLoggingOut && <FullPageLoading text="Đang đăng xuất..." />}

      {!isMobile && (
        <Sider
          collapsible
          collapsed={collapsed}
          trigger={null}
          width={248}
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            background: "#111827",
          }}
        >
          <SidebarContent collapsed={collapsed} selectedKey={selectedKey} />
        </Sider>
      )}

      <Drawer
        placement="left"
        size={248}
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        closable={false}
        styles={{
          body: { padding: 0, background: "#111827" },
          section: { background: "#111827" },
        }}
      >
        <SidebarContent
          selectedKey={selectedKey}
          onMenuClick={() => setMobileMenuOpen(false)}
        />
      </Drawer>

      <Layout>
        <Header
          style={{
            minHeight: 64,
            height: "auto",
            padding: isMobile ? "10px 12px" : "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: isMobile ? "wrap" : "nowrap",
            gap: isMobile ? 10 : 16,
            background: colorBgContainer,
            borderBottom: "1px solid #eef0f4",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <Space size={isMobile ? 10 : 16} style={{ minWidth: 0 }}>
            <Button
              type="text"
              icon={
                isMobile ? (
                  <MenuUnfoldOutlined />
                ) : collapsed ? (
                  <MenuUnfoldOutlined />
                ) : (
                  <MenuFoldOutlined />
                )
              }
              onClick={() =>
                isMobile
                  ? setMobileMenuOpen(true)
                  : setCollapsed((value) => !value)
              }
            />

            {isMobile ? (
              <Typography.Text
                strong
                style={{
                  fontSize: 16,
                  maxWidth: 180,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Theramd Admin
              </Typography.Text>
            ) : (
              <Input
                allowClear
                prefix={<SearchOutlined />}
                placeholder="Tìm đơn hàng, sản phẩm, khách hàng..."
                style={{ width: 360 }}
              />
            )}
          </Space>

          <Space size={isMobile ? 8 : 18} style={{ marginLeft: "auto" }}>
            <Badge count={5} size="small">
              <Button
                type="text"
                shape="circle"
                icon={<BellOutlined />}
                size="large"
              />
            </Badge>

            <Dropdown
              menu={{ items: accountItems, onClick: handleAccountMenuClick }}
              placement="bottomRight"
            >
              <Space style={{ cursor: "pointer" }}>
                <Avatar icon={<UserOutlined />} />
                {!isMobile && (
                  <Typography.Text strong>{user.name}</Typography.Text>
                )}
              </Space>
            </Dropdown>
          </Space>

          {isMobile && (
            <Input
              allowClear
              prefix={<SearchOutlined />}
              placeholder="Tìm đơn hàng, sản phẩm..."
              style={{ width: "100%", flex: "1 1 100%" }}
            />
          )}
        </Header>

        <Content style={{ padding: isMobile ? 12 : 24 }}>
          <Breadcrumb
            items={breadcrumbItems}
            style={{ marginBottom: isMobile ? 12 : 16 }}
          />

          <div
            style={{
              minHeight: isMobile
                ? "calc(100vh - 150px)"
                : "calc(100vh - 128px)",
              padding: isMobile ? 16 : 24,
              background: colorBgContainer,
              borderRadius: isMobile ? 10 : borderRadiusLG,
              boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
