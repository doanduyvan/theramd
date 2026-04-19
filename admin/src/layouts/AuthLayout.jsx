import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left side */}
        <div className="relative hidden lg:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 via-cyan-400/10 to-emerald-400/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.18),transparent_28%)]" />

          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="text-sm font-medium tracking-wide text-slate-200">
                  THERAMD ADMIN
                </span>
              </div>
            </div>

            <div className="max-w-xl">
              <p className="mb-4 text-sm uppercase tracking-[0.28em] text-sky-300">
                Admin Portal
              </p>

              <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
                Quản trị hệ thống nhanh hơn, rõ ràng hơn, an toàn hơn.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-slate-300 xl:text-lg">
                Quản lý sản phẩm, đơn hàng, người dùng và phân quyền trong một
                giao diện tập trung, tối ưu cho đội ngũ vận hành.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-2xl font-semibold">24/7</p>
                  <p className="mt-1 text-sm text-slate-300">
                    Vận hành liên tục
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-2xl font-semibold">RBAC</p>
                  <p className="mt-1 text-sm text-slate-300">Kiểm soát quyền</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-2xl font-semibold">Realtime</p>
                  <p className="mt-1 text-sm text-slate-300">
                    Theo dõi dữ liệu
                  </p>
                </div>
              </div>
            </div>

            <div className="text-sm text-slate-400">
              © 2026 TheraMD. Internal Administration System.
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
