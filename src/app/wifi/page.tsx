"use client";

import React, { useState, useRef, useCallback } from "react";
import { toPng } from "html-to-image";

import { WifiForm, WifiFormValues } from "@/components/wifi-form";
import { QrCard } from "@/components/qr-card";
import { Button } from "@/components/ui/button";

const defaultValues: WifiFormValues = {
  brandName: "My Cafe",
  ssid: "MyCafe_WIFI",
  password: "password123",
  bgColor: "#f0f0f0",
};

export default function Page() {
  const [cardData, setCardData] = useState<WifiFormValues>(defaultValues);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleFormChange = useCallback((values: WifiFormValues) => {
    setCardData(values);
  }, []);

  const handleFormSubmit = useCallback((values: WifiFormValues) => {
    console.log("Form submitted:", values);
    // 폼 제출 시 동작 (예: 다운로드 트리거 또는 다른 액션)
    handleDownload();
  }, []);

  const handleDownload = useCallback(() => {
    if (cardRef.current === null) {
      return;
    }

    toPng(cardRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${cardData.brandName || "wifi"}-qr-card.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Failed to download image", err);
        // 사용자에게 오류 알림 (예: toast 메시지)
        alert("이미지 다운로드에 실패했습니다.");
      });
  }, [cardData.brandName]);

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row gap-8 items-start">
      <div className="w-full md:w-1/2">
        <WifiForm
          onSubmit={handleFormSubmit}
          onChange={handleFormChange}
          defaultValues={defaultValues}
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center gap-4">
        <div ref={cardRef}>
          <QrCard {...cardData} />
        </div>
        <Button
          onClick={handleDownload}
          className="w-full max-w-xs"
        >
          Download QR Card (PNG)
        </Button>
      </div>
    </div>
  );
}
