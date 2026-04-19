import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
  console.log("vao mainlayout");
  return (
    <div>
      <header>
        {/* <nav style={{ display: 'flex', gap: '12px' }}>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/login">Login</Link>
        </nav> */}
      </header>

      <main style={{ padding: "16px" }}>
        <Outlet />
      </main>
    </div>
  );
}
