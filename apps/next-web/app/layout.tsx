import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Web (WebView)",
  description: "Next.js app loaded in Expo WebView via external URL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
