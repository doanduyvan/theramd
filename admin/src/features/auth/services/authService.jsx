import api, { get, post } from "@/shared/lib/axios";

/**
 * Chuẩn hóa dữ liệu response cho auth.
 * Bạn có thể sửa lại cho khớp chính xác backend hiện tại.
 */
function normalizeAuthResponse(data) {
  return {
    user: data?.user ?? data?.data?.user ?? null,
    message: data?.message ?? data?.data?.message ?? "",
    authenticated:
      data?.authenticated ??
      data?.data?.authenticated ??
      Boolean(data?.user || data?.data?.user),
    raw: data,
  };
}

/**
 * Đăng nhập bằng session + cookie.
 * Server nên set cookie phiên sau khi login thành công.
 *
 * @param {{
 *   email: string,
 *   password: string,
 *   remember?: boolean
 * }} payload
 * @param {object} requestConfig - config Axios bổ sung nếu cần
 * @returns {Promise<{user: object|null, message: string, authenticated: boolean, raw: any}>}
 */
export async function login(payload, requestConfig = {}) {
  const response = await post(
    "/auth/login",
    {
      email: payload.email,
      password: payload.password,
      remember: payload.remember ?? false,
    },
    requestConfig,
  );

  return normalizeAuthResponse(response.data);
}

/**
 * Đăng xuất.
 * Với session-based auth, server thường sẽ hủy session + xóa cookie liên quan.
 *
 * @param {object} requestConfig
 * @returns {Promise<any>}
 */
export async function logout(requestConfig = {}) {
  const response = await post("/auth/logout", {}, requestConfig);
  return response.data;
}

/**
 * Gửi email quên mật khẩu.
 *
 * @param {{ email: string }} payload
 * @param {object} requestConfig
 * @returns {Promise<any>}
 */
export async function forgotPassword(payload, requestConfig = {}) {
  const response = await post(
    "/auth/forgot-password",
    {
      email: payload.email,
    },
    requestConfig,
  );

  return response.data;
}

/**
 * Lấy thông tin user hiện tại từ session.
 *
 * @param {object} requestConfig
 * @returns {Promise<{user: object|null, message: string, authenticated: boolean, raw: any}>}
 */
export async function getMe(requestConfig = {}) {
  const response = await get("/auth/me", requestConfig);
  return normalizeAuthResponse(response.data);
}

/**
 * Nếu backend của bạn có endpoint lấy CSRF cookie riêng
 * như /sanctum/csrf-cookie hoặc /csrf-cookie,
 * có thể dùng hàm này trước khi login nếu cần.
 *
 * @param {string} url
 * @param {object} requestConfig
 * @returns {Promise<any>}
 */
export async function getCsrfCookie(url = "/csrf-cookie", requestConfig = {}) {
  const response = await api.get(url, requestConfig);
  return response.data;
}

const authService = {
  login,
  logout,
  forgotPassword,
  getMe,
  getCsrfCookie,
};

export default authService;
