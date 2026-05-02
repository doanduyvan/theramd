import { useState } from "react";
import { useEffect } from "react";
import productService from "../services/productService";
import { notification } from "antd";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    setIsLoading(true);

    try {
      const result = await productService.getProducts();
      setProducts(result.data ?? []);
    } catch (error) {
      console.error("Lỗi lấy danh sách sản phẩm:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function syncProducts() {
    setIsLoading(true);
    try {
      const result = await productService.syncProducts();
      notification.success({ title: "Đồng bộ sản phẩm thành công" });
    } catch (e) {
      console.log(e);
      notification.error({ title: "Có lỗi trong quá trình đồng bộ!" });
    } finally {
      setIsLoading(false);
      getProducts();
    }
  }

  return {
    products,
    setProducts,

    isLoading,
    setIsLoading,
    syncProducts,
    getProducts,
  };
}

export default useProducts;
