"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Control } from "react-hook-form";
import { z } from "zod";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import { useRef, useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Define the form schema using Zod
const formSchema = z.object({
  ssid: z.string().min(1, { message: "SSID는 필수 항목입니다." }),
  password: z.string().optional(),
  brandName: z.string().optional(),
  backgroundColor: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, { message: "유효한 색상 코드여야 합니다." })
    .optional()
    .default("#ffffff"),
  security: z.enum(["WPA", "WEP", "nopass"]).default("WPA"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Page() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardData, setCardData] = useState<FormValues>({
    ssid: "",
    password: "",
    brandName: "",
    backgroundColor: "#ffffff",
    security: "WPA",
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ssid: "",
      password: "",
      brandName: "",
      backgroundColor: "#ffffff",
      security: "WPA",
    },
    mode: "onChange",
  });

  const watchedValues = form.watch();

  useEffect(() => {
    const result = formSchema.safeParse(watchedValues);
    if (result.success) {
      setCardData(result.data);
    } else {
      setCardData((prev) => ({ ...prev, ...watchedValues }));
    }
  }, [watchedValues, formSchema]);

  const generateWifiQrString = (data: FormValues): string => {
    const { ssid, password, security } = data;
    if (!ssid) return "";
    const escapedSsid = ssid.replace(/([\;,:"])/g, "\\$1");
    const escapedPassword = password
      ? password.replace(/([\;,:"])/g, "\\$1")
      : "";

    let qrString = `WIFI:S:${escapedSsid};`;
    if (security !== "nopass") {
      qrString += `T:${security};`;
      if (escapedPassword) {
        qrString += `P:${escapedPassword};`;
      }
    } else {
      qrString += `T:nopass;`;
    }
    qrString += ";";
    return qrString;
  };

  const handleDownload = () => {
    if (cardRef.current) {
      html2canvas(cardRef.current, {
        scale: 4,
        useCORS: true,
        backgroundColor: cardData.backgroundColor,
        onclone: (document) => {
          const qrCanvas = document.querySelector("canvas");
          if (qrCanvas) {
          }
        },
      })
        .then((canvas) => {
          const link = document.createElement("a");
          link.download = "wifi-qr-card.png";
          link.href = canvas.toDataURL("image/png");
          link.click();
        })
        .catch((error) => {
          console.error("Error generating canvas: ", error);
          alert("이미지 생성 중 오류가 발생했습니다.");
        });
    }
  };

  const control: Control<FormValues> = form.control;

  return (
    <div className="container mx-auto p-4 grid md:grid-cols-2 gap-8 items-start">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold mb-4">WIFI QR 코드 생성</h1>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={control}
              name="ssid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SSID (네트워크 이름)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="예: MyHomeWifi"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="security"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>보안 유형</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="WPA">WPA/WPA2</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">비밀번호 없음</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {watchedValues.security !== "nopass" && (
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="네트워크 비밀번호"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={control}
              name="brandName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>브랜드 이름 (선택)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="예: 우리 가게"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="backgroundColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>카드 배경색</FormLabel>
                  <FormControl>
                    <Input
                      type="color"
                      {...field}
                      value={field.value ?? "#ffffff"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Button
          onClick={handleDownload}
          className="w-full mt-6"
        >
          이미지로 다운로드
        </Button>
      </div>

      <div className="flex justify-center items-center md:items-start pt-4 md:pt-12">
        <div
          ref={cardRef}
          className="aspect-[3/4] w-[256px] border rounded-lg overflow-hidden flex flex-col shadow-lg bg-white"
          style={{ backgroundColor: cardData.backgroundColor ?? "#ffffff" }}
        >
          <div
            className="p-4 text-center font-semibold text-lg flex-shrink-0 border-b"
            style={{
              color: getContrastColor(cardData.backgroundColor ?? "#ffffff"),
            }}
          >
            WIFI 접속
          </div>
          <div className="flex-grow flex justify-center items-center p-4 bg-white">
            {cardData.ssid ? (
              <QRCodeCanvas
                id="qr-canvas"
                value={generateWifiQrString(cardData)}
                size={160}
                level={"H"}
                bgColor="#ffffff"
                fgColor="#000000"
              />
            ) : (
              <div className="text-gray-400 text-sm p-4 text-center">
                SSID를 입력하여
                <br />
                QR 코드를 생성하세요.
              </div>
            )}
          </div>
          <div
            className="p-4 text-center text-sm flex-shrink-0 relative border-t"
            style={{
              color: getContrastColor(
                cardData.backgroundColor ?? "#ffffff",
                true
              ),
            }}
          >
            {cardData.brandName}
            <span
              className="absolute bottom-2 right-2 text-xs"
              style={{
                color: getContrastColor(
                  cardData.backgroundColor ?? "#ffffff",
                  true
                ),
              }}
            >
              by toycrane
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function getContrastColor(hexColor: string, lightGray?: boolean): string {
  if (!hexColor || !/^#[0-9A-F]{6}$/i.test(hexColor)) {
    return lightGray ? "#a0aec0" : "#000000";
  }
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  if (lightGray) {
    return luminance > 0.5 ? "#a0aec0" : "#e2e8f0";
  }
  return luminance > 0.5 ? "#000000" : "#ffffff";
}
