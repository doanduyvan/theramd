import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";
import useAuthBootstrap from "@/features/auth/hooks/useAuthBootstrap";
import FullPageLoading from "@/shared/components/FullPageLoading";

function App() {
  const { isBootstrapping } = useAuthBootstrap();

  if (isBootstrapping) {
    return <FullPageLoading text="Đang tải phiên đăng nhập..." />;
  }

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
