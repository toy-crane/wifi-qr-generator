"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen p-8">
      <h1>WiFi QR Generator</h1>
      <Button
        onClick={() => router.push("/wifi")}
        variant="default"
      >
        Generate WiFi QR Code
      </Button>
    </main>
  );
}
