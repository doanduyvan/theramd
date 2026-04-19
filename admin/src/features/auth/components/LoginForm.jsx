import { Link } from "react-router-dom";
import { PATHS } from "@/routes/paths";
import { Button } from "antd";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function LoginForm({
  values,
  errors,
  serverError,
  isSubmitting,
  handleChange,
  handleSubmit,
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
      <div className="mb-8">
        <div className="mb-4 inline-flex items-center rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-medium tracking-wide text-sky-300">
          Secure Sign In
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-white">
          Đăng nhập
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-300">
          Đăng nhập để truy cập hệ thống quản trị TheraMD.
        </p>
      </div>

      {/* <form className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="admin@theramd.vn"
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-200"
            >
              Mật khẩu
            </label>

            <Link
              to={PATHS.FORGOTPASSWORD}
              className="text-sm text-sky-300 transition hover:text-sky-200"
            >
              Quên mật khẩu?
            </Link>
          </div>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Nhập mật khẩu"
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20"
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-3 text-sm text-slate-300">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-white/20 bg-slate-900 text-sky-400 focus:ring-sky-400/30"
            />
            <span>Ghi nhớ đăng nhập</span>
          </label>
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-2xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30 active:scale-[0.99]"
        >
          Đăng nhập
        </button>
      </form> */}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            placeholder="admin@theramd.vn"
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-400">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Mật khẩu
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Nhập mật khẩu"
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none"
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-400">{errors.password}</p>
          )}
        </div>

        <label className="flex items-center gap-3 text-sm text-slate-300">
          <input
            type="checkbox"
            name="remember"
            checked={values.remember}
            onChange={handleChange}
            className="h-4 w-4 rounded"
          />
          <span>Ghi nhớ đăng nhập</span>
        </label>

        {serverError && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {serverError}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-5">
              <Spin
                style={{ color: "white" }}
                indicator={<LoadingOutlined spin />}
                size="medium"
              />
              <span>Đang đăng nhập...</span>
            </div>
          ) : (
            "Đăng nhập"
          )}
        </button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Internal
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm leading-6 text-amber-100">
        Chỉ dành cho tài khoản quản trị được cấp quyền.
      </div>
    </div>
  );
}
