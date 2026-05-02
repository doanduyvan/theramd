import { get } from "@/shared/lib/axios";

export async function getProducts(params = {}, requestConfig = {}) {
  const response = await get("/products", {
    ...requestConfig,
    params,
  });

  return response.data;
}

export async function syncProducts() {
  const response = await get("/sync/products");
  return response.data;
}

const productService = {
  getProducts,
  syncProducts,
};

export default productService;
