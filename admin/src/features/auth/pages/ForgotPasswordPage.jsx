// src/features/auth/pages/ForgotPasswordPage.jsx
import { Link } from "react-router-dom";
import { PATHS } from "@/routes/paths";

export default function ForgotPasswordPage() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
      <div className="mb-8">
        <div className="mb-4 inline-flex items-center rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-medium tracking-wide text-amber-300">
          Password Recovery
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-white">
          Quên mật khẩu
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-300">
          Nhập email quản trị đã đăng ký. Chúng tôi sẽ gửi hướng dẫn đặt lại mật
          khẩu.
        </p>
      </div>

      <form className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Email quản trị
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="admin@theramd.vn"
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20"
          />
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-2xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30 active:scale-[0.99]"
        >
          Gửi link đặt lại mật khẩu
        </button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Support
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-4 text-sm leading-6 text-slate-300">
          Nếu email hợp lệ, hệ thống sẽ gửi liên kết đặt lại mật khẩu. Liên kết
          này nên có thời hạn ngắn để tăng an toàn.
        </div>

        <Link
          to={PATHS.LOGIN}
          className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10"
        >
          Quay lại đăng nhập
        </Link>
      </div>
    </div>
  );
}
