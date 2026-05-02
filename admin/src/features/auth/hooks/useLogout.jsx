import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "@/features/auth/services/authService";
import { useAuthStore } from "@/features/auth/store/authStore";
import { PATHS } from "@/routes/paths";

export function useLogout() {
  const navigate = useNavigate();
  const logoutStore = useAuthStore((state) => state.logout);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function logout() {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await authService.logout();
    } catch (error) {
      // Token có thể đã hết hạn hoặc bị xóa ở server.
      // Dù API logout lỗi, vẫn xóa state frontend.
    } finally {
      logoutStore();
      setIsLoggingOut(false);
      navigate(PATHS.LOGIN, { replace: true });
    }
  }

  return {
    logout,
    isLoggingOut,
  };
}

export default useLogout;
