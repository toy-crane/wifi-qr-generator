"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="relative w-7 h-7">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer border-0"
      />
      <div
        className="w-full h-full rounded-full"
        style={{ backgroundColor: value }}
      />
    </div>
  );
}

export function WifiQrCodeGenerator() {
  const [brandName, setBrandName] = useState("ODD");
  const [networkName, setNetworkName] = useState("");
  const [password, setPassword] = useState("");
  const [securityType, setSecurityType] = useState("WPA");
  const [qrCodeData, setQRCodeData] = useState("");
  const [boxColor, setBoxColor] = useState("#000000"); // Default to black

  const generateQRCode = () => {
    const wifiString = `WIFI:T:${securityType};S:${networkName};P:${password};;`;
    setQRCodeData(wifiString);
  };

  return (
    <div className="container max-w-2xl w-full mx-auto p-4 bg-white">
      <h1 className="text-4xl font-bold text-center mb-6">WIFI QRCODE</h1>
      <div className="mb-6 flex justify-center">
        <div
          className="rounded-lg p-6 flex flex-col justify-between items-center aspect-[1/1] w-96"
          style={{ backgroundColor: boxColor }}
        >
          <div className="text-2xl font-bold text-white text-center mb-2">
            QR코드로 WIFI 접속
          </div>
          <div className="flex-grow flex items-center justify-center">
            {qrCodeData ? (
              <div className="bg-white p-3 rounded">
                <QRCodeSVG value={qrCodeData} size={200} />
              </div>
            ) : (
              <div className="flex items-center justify-center aspect-[1/1] w-[200px] border border-dashed border-white rounded bg-white/10">
                <span className="text-white text-center p-4">QR 코드</span>
              </div>
            )}
          </div>
          <div className="text-3xl font-bold text-white text-center mt-2">
            {brandName}
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="brandName">브랜드 이름</Label>
          <Input
            id="brandName"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="ODD"
          />
        </div>

        <div>
          <Label htmlFor="networkName">네트워크 이름(SSID)</Label>
          <Input
            id="networkName"
            value={networkName}
            onChange={(e) => setNetworkName(e.target.value)}
            placeholder="Placeholder text"
          />
        </div>

        <div>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Placeholder text"
          />
        </div>

        <div>
          <Label htmlFor="securityType">암호화 유형</Label>
          <Select value={securityType} onValueChange={setSecurityType}>
            <SelectTrigger id="securityType">
              <SelectValue placeholder="Selected option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="WPA">WPA/WPA2</SelectItem>
              <SelectItem value="WEP">WEP</SelectItem>
              <SelectItem value="nopass">None</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="boxColor">박스 배경색</Label>
          <div className="flex items-center space-x-2">
            <ColorPicker value={boxColor} onChange={setBoxColor} />
            <Input
              type="text"
              value={boxColor}
              onChange={(e) => setBoxColor(e.target.value)}
              placeholder="#000000"
              className="flex-grow"
            />
          </div>
        </div>

        <Button className="w-full" onClick={generateQRCode}>
          생성하기
        </Button>
      </div>
    </div>
  );
}
