"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  brandName: z.string().min(1, { message: "브랜드 이름을 입력해주세요." }),
  ssid: z.string().min(1, { message: "네트워크 이름(SSID)을 입력해주세요." }),
  password: z.string().optional(), // 비밀번호는 선택 사항일 수 있으므로 optional
  bgColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, {
    message: "유효한 HEX 색상 코드를 입력해주세요. (예: #FFFFFF)",
  }),
});

export type WifiFormValues = z.infer<typeof formSchema>;

interface WifiFormProps {
  onSubmit: (values: WifiFormValues) => void;
  defaultValues?: Partial<WifiFormValues>;
}

export function WifiForm({ onSubmit, defaultValues }: WifiFormProps) {
  const form = useForm<WifiFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brandName: "",
      ssid: "",
      password: "",
      bgColor: "#FFFFFF",
      ...defaultValues,
    },
  });

  function handleSubmit(values: WifiFormValues) {
    onSubmit(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="brandName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>브랜드 이름</FormLabel>
              <FormControl>
                <Input
                  placeholder="카페 이름 등을 입력하세요"
                  {...field}
                />
              </FormControl>
              <FormDescription>카드 하단에 표시될 이름입니다.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ssid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>네트워크 이름 (SSID)</FormLabel>
              <FormControl>
                <Input
                  placeholder="WIFI 네트워크 이름을 입력하세요"
                  {...field}
                />
              </FormControl>
              <FormDescription>연결할 WIFI의 이름입니다.</FormDescription>
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
                  type="password"
                  placeholder="WIFI 비밀번호를 입력하세요"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                WIFI 비밀번호입니다. 없다면 비워두세요.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bgColor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>배경색</FormLabel>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Input
                    type="color"
                    {...field}
                    className="w-12 h-8 p-1"
                  />
                </FormControl>
                <FormControl>
                  {/* Input 컴포넌트가 type="color" 일 때 value 업데이트가 제대로 안될 수 있어, 별도의 Input으로 관리 */}
                  <Input
                    type="text"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="flex-1"
                    placeholder="#FFFFFF"
                  />
                </FormControl>
              </div>
              <FormDescription>
                카드 배경 색상을 선택하거나 HEX 코드를 입력하세요.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">QR 카드 생성</Button>
      </form>
    </Form>
  );
}
