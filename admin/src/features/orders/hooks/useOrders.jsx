import { useEffect, useState } from "react";
import orderService from "../services/orderService";
import { notification } from "antd";
export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 50,
    total: 0,
  });

  useEffect(() => {
    getOrders({
      page: pagination.current,
      per_page: pagination.pageSize,
    });
  }, []);

  async function getOrders(params = {}) {
    setIsLoading(true);

    try {
      const result = await orderService.getOrders({
        page: params.page ?? pagination.current,
        per_page: params.per_page ?? pagination.pageSize,
      });

      const paginator = result.data;

      setOrders(paginator?.data ?? []);

      setPagination({
        current: paginator?.current_page ?? 1,
        pageSize: paginator?.per_page ?? 50,
        total: paginator?.total ?? 0,
      });
    } catch (error) {
      console.error("Lỗi lấy danh sách đơn hàng:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function syncOrders() {
    setIsLoading(true);
    try {
      const result = await orderService.syncOrders();
      notification.success({ title: "Đồng bộ đơn hàng thành công" });
    } catch (e) {
      console.log(e);
      notification.error({ title: "Có lỗi trong quá trình đồng bộ!" });
    } finally {
      setIsLoading(false);
      getOrders();
    }
  }

  function handleTableChange(nextPagination) {
    getOrders({
      page: nextPagination.current,
      per_page: nextPagination.pageSize,
    });
  }

  return {
    orders,
    setOrders,

    pagination,
    setPagination,
    handleTableChange,

    isLoading,
    setIsLoading,

    getOrders,
    syncOrders,
  };
}

export default useOrders;
