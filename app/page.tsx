import { WifiQrCodeGenerator } from "@/components/wifi-qr-code-generator";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-8">
      <WifiQrCodeGenerator />
    </main>
  );
}
