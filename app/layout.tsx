import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const image = `${protocol}://${host}/og.png`;
  return {
    title: "好软集｜值得长期使用的软件收藏",
    description: "人工精选真正好用、设计用心、值得长期使用的软件。",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: { title: "好软集", description: "把真正好用的软件，留在这里。", images: [image], locale: "zh_CN", type: "website" },
    twitter: { card: "summary_large_image", title: "好软集", description: "把真正好用的软件，留在这里。", images: [image] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
