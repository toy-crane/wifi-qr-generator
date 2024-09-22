import { ReactNode } from "react";

interface AboutLayoutProps {
  children: ReactNode;
}

export default function AboutLayout({ children }: AboutLayoutProps) {
  return <section className="container mx-auto px-4 py-8">{children}</section>;
}
