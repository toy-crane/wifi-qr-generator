"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import * as htmlToImage from "html-to-image";
import { QRCodeSVG } from "qrcode.react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

const formSchema = z.object({
  brandName: z.string().min(1, "브랜드 이름은 필수입니다"),
  networkName: z.string().min(1, "네트워크 이름은 필수입니다"),
  password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다"),
  securityType: z.enum(["WPA", "WEP"]),
  boxColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "유효한 색상 코드를 입력해주세요"),
});

export function WifiQrCodeGenerator() {
  const [qrCodeData, setQRCodeData] = useState("");
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brandName: "ODD",
      networkName: "",
      password: "",
      securityType: "WPA",
      boxColor: "#000000",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const wifiString = `WIFI:T:${values.securityType};S:${values.networkName};P:${values.password};;`;
    setQRCodeData(wifiString);
  };

  const handleDownload = async () => {
    if (qrCodeRef.current && qrCodeData) {
      const dataUrl = await htmlToImage.toPng(qrCodeRef.current);
      const link = document.createElement("a");
      link.download = "wifi-qr-code.png";
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div className="container max-w-2xl w-full mx-auto p-4 bg-white">
      <h1 className="text-4xl font-bold text-center mb-6">WIFI QRCODE</h1>
      <div className="mb-6 flex flex-col items-center">
        <div
          ref={qrCodeRef}
          className="rounded-lg p-6 flex flex-col justify-between items-center aspect-square w-[360px] relative"
          style={{ backgroundColor: form.watch("boxColor") }}
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
            {form.watch("brandName")}
          </div>
          <div className="absolute bottom-2 right-2 text-xs text-white/70">
            by toycrane
          </div>
        </div>
        <div className="flex space-x-2 mt-4">
          <Button
            onClick={handleDownload}
            className="flex items-center"
            variant="outline"
            disabled={!qrCodeData}
          >
            <span className="mr-2">QR 코드 다운로드</span>
          </Button>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="brandName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>브랜드 이름</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="브랜드 이름을 입력해 주세요" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="networkName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>네트워크 이름(SSID)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="네트워크 이름을 입력해 주세요"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="비밀번호를 입력해 주세요"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="securityType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>암호화 유형</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="암호화 유형을 선택해 주세요" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="WPA">WPA/WPA2</SelectItem>
                    <SelectItem value="WEP">WEP</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="boxColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>박스 배경색</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <ColorPicker
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <Input
                      {...field}
                      placeholder="#000000 형식으로 입력해 주세요"
                      className="flex-grow"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            생성하기
          </Button>
        </form>
      </Form>
    </div>
  );
}

function ColorPicker({ value, onChange }: ColorPickerProps) {
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
