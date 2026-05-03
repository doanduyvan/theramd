import { Scanner } from "@yudiel/react-qr-scanner";
import { useState, useRef } from "react";
import QRService from "../services/QRService";

export default function useQRScan(idOrder, order) {
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
      //
      const scannedCodes = Object.values(codes);

      console.log("id order", idOrder);
      console.log("qrs", scannedCodes);
    } catch (e) {
      //
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
