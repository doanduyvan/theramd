import * as XLSX from "xlsx";
import { notification } from "antd";

function getOrderCode(order) {
  return order?.full_fields?.name || `#${order?.id_sapo || order?.id || ""}`;
}

function getQrCodes(order) {
  return Array.isArray(order?.qr_product_codes) ? order.qr_product_codes : [];
}

export default function useExcel() {
  function exportOrderQrExcel(orders = []) {
    if (!orders.length) {
      notification.info({ title: "Không có dữ liệu để xuất Excel" });
      return;
    }

    const rows = orders.flatMap((order, index) => {
      const orderCode = getOrderCode(order);
      const qrCodes = getQrCodes(order);

      const orderRows = qrCodes.length
        ? qrCodes.map((item) => ({
            "Mã đơn hàng": orderCode,
            "Mã QR": item.qr_code || "",
          }))
        : [
            {
              "Mã đơn hàng": orderCode,
              "Mã QR": "",
            },
          ];

      if (index === orders.length - 1) {
        return orderRows;
      }

      return [
        ...orderRows,
        {
          "Mã đơn hàng": "",
          "Mã QR": "",
        },
      ];
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);

    worksheet["!cols"] = [{ wch: 24 }, { wch: 48 }];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Order QR");

    const fileName = `order-qr-${new Date().toISOString().slice(0, 10)}.xlsx`;

    XLSX.writeFile(workbook, fileName);

    notification.success({ title: "Xuất Excel thành công" });
  }

  return {
    exportOrderQrExcel,
  };
}
