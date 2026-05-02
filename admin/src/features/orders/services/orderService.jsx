import { get } from "@/shared/lib/axios";

export async function getOrders(params = {}, requestConfig = {}) {
  const response = await get("/orders", {
    ...requestConfig,
    params,
  });

  return response.data;
}

export async function syncOrders(requestConfig = {}) {
  const response = await get("/sync/orders", requestConfig);

  return response.data;
}

const orderService = {
  getOrders,
  syncOrders,
};

export default orderService;
