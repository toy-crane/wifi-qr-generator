"use client";

import React from "react";
import { QRCodeSVG } from "qrcode.react";

interface QrCardProps {
  brandName: string;
  ssid: string;
  password?: string;
  bgColor?: string;
}

export function QrCard({
  brandName,
  ssid,
  password,
  bgColor = "#FFFFFF",
}: QrCardProps) {
  // WIFI QR 코드 문자열 생성 (WPA/WPA2 기준)
  // 형식: WIFI:T:WPA;S:<SSID>;P:<PASSWORD>;;
  const wifiString = `WIFI:T:WPA;S:${ssid};P:${password || ""};;`;

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="w-[256px] aspect-[3/4] p-4 flex flex-col items-center justify-between rounded-lg shadow-md relative"
    >
      <h2 className="text-xl font-semibold text-center text-black">
        WIFI 접속
      </h2>

      <div className="flex justify-center items-center flex-grow my-4">
        <QRCodeSVG
          value={wifiString}
          size={180} // QR 코드 크기 조정 필요 시 수정
          bgColor="#FFFFFF" // QR 코드 자체 배경색 (흰색)
          fgColor="#000000" // QR 코드 패턴 색상 (검정색)
          level="L" // 오류 복원 수준 (L, M, Q, H)
          marginSize={0} // includeMargin 대신 marginSize 사용
        />
      </div>

      <p className="text-lg font-medium text-center text-black">{brandName}</p>

      <p className="absolute bottom-1 right-2 text-xs text-gray-600">
        by toycrane
      </p>
    </div>
  );
}
