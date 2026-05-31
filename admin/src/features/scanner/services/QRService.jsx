import { post } from "@/shared/lib/axios";

async function createQR(data) {
  return post("/orders/postqr", data);
}

const QRService = { createQR };

export default QRService;
