import { Scanner } from "@yudiel/react-qr-scanner";
import { useState, useRef } from "react";
import QRService from "../services/QRService";
import { notification, Modal } from "antd";
import { useNavigate } from "react-router-dom";

export default function useQRScan(idOrder, order) {
  const navigate = useNavigate();

  const [codes, setCodes] = useState({});
  const [paused, setPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scannerRef = useRef(null);
  const codesRef = useRef({});

  const beep = () => {
    const audio = new Audio("/sound/beep-ok.mp3");

    audio.play().catch((err) => {
      console.log("Cannot play audio:", err);
    });
  };

  const handleScan = (result) => {
    if (!result || result.length === 0) return;

    const validResult = result.filter(isInsideFinder);
    if (validResult.length === 0) return;

    const values = validResult.map((item) => item.rawValue);
    const newValues = values.filter((value) => !codesRef.current[value]);

    if (newValues.length === 0) return;

    const next = { ...codesRef.current };

    newValues.forEach((value) => {
      next[value] = value;
    });

    codesRef.current = next;
    setCodes(next);

    newValues.forEach((_, index) => {
      setTimeout(() => beep(), index * 200);
    });
  };

  const isInsideFinder = (code) => {
    const video = scannerRef.current?.querySelector("video");
    if (!video) return false;

    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    const viewWidth = video.offsetWidth;
    const viewHeight = video.offsetHeight;

    if (!videoWidth || !videoHeight || !viewWidth || !viewHeight) return false;

    const scale = Math.max(viewWidth / videoWidth, viewHeight / videoHeight);

    const renderedWidth = videoWidth * scale;
    const renderedHeight = videoHeight * scale;

    const cropX = (renderedWidth - viewWidth) / 2;
    const cropY = (renderedHeight - viewHeight) / 2;

    const finderSize = Math.min(viewWidth, viewHeight) * 0.7;
    const left = (viewWidth - finderSize) / 2;
    const top = (viewHeight - finderSize) / 2;
    const right = left + finderSize;
    const bottom = top + finderSize;

    const box = code.boundingBox;

    const boxLeft = box.x * scale - cropX;
    const boxTop = box.y * scale - cropY;
    const boxRight = (box.x + box.width) * scale - cropX;
    const boxBottom = (box.y + box.height) * scale - cropY;

    return (
      boxLeft >= left &&
      boxRight <= right &&
      boxTop >= top &&
      boxBottom <= bottom
    );
  };

  const handleReset = () => {
    codesRef.current = {};
    setCodes({});
  };

  const handleError = (err) => {
    console.error(err);

    if (!window.isSecureContext) {
      alert(
        "Camera chỉ chạy trên HTTPS hoặc localhost. Hãy mở bằng http://localhost:5173 hoặc dùng HTTPS.",
      );
      return;
    }

    alert(err?.message || "Không mở được camera");
  };

  async function createQR() {
    setIsLoading(true);
    try {
      const scannedCodes = Object.values(codes);

      if (scannedCodes.length == 0)
        return notification.info({ title: "Chưa có QR" });

      const payload = {
        idOrder,
        qrs: scannedCodes,
      };

      const res = await QRService.createQR(payload);
      // notification.success({ title: "Thêm dữ liệu thành công" });
      console.log(res.data);
      const result = res.data;
      const data = result?.data || {};
      const duplicateQrs = data?.duplicate_qrs || [];
      Modal.confirm({
        title: result?.message || "Lưu QR thành công",
        okText: "OK",
        cancelText: "Quay lại",
        // closable: true,
        onCancel: () => navigate(-1),
        width: 560,
        content: (
          <div>
            <p>
              Tổng mã đã quét: <b>{data.total_received || 0}</b>
            </p>
            <p>
              Số mã lưu mới: <b>{data.saved || 0}</b>
            </p>
            <p>
              Số mã bị trùng: <b>{data.duplicated || 0}</b>
            </p>

            {duplicateQrs.length > 0 && (
              <div>
                <p>
                  <b>Danh sách mã trùng:</b>
                </p>
                <div style={{ maxHeight: 180, overflowY: "auto" }}>
                  {duplicateQrs.map((qr) => (
                    <div key={qr}>{qr}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ),
      });
    } catch (e) {
      console.log(e);
      notification.error({ title: "Lỗi hệ thống!" });
    } finally {
      setIsLoading(false);
    }
  }

  return {
    codes,
    setCodes,
    paused,
    setPaused,
    scannerRef,
    codesRef,
    handleScan,
    handleReset,
    handleError,
    createQR,
  };
}
