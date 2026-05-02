import { useEffect, useState } from "react";
import authService from "@/features/auth/services/authService";
import { useAuthStore } from "@/features/auth/store/authStore";

export function useAuthBootstrap() {
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      const { accessToken, setCredentials, logout } = useAuthStore.getState();

      if (!accessToken) {
        logout();
        setIsBootstrapping(false);
        return;
      }

      try {
        const result = await authService.getMe();

        setCredentials({
          user: result.data,
          accessToken,
        });
      } catch (error) {
        if (error?.response?.status === 401) {
          logout();
        }
      } finally {
        setIsBootstrapping(false);
      }
    }

    bootstrap();
  }, []);

  return { isBootstrapping };
}

export default useAuthBootstrap;
