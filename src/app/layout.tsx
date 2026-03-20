import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoVista — Premium Vehicle Discovery",
  description: "Find the right car with confidence. Deep filters, trust signals, price intelligence and smart comparison.",
  keywords: ["car", "vehicle", "automotive", "marketplace", "buy car", "used car", "premium"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
