import { post } from "@/shared/lib/axios";

async function createQR(data) {
  return post("/orders/saveqr", data);
}

const QRService = { createQR };

export default QRService;
