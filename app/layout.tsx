import type { Metadata } from "next";
import "./globals.css";

import localFont from "next/font/local";

const virgil = localFont({
  src: "../public/fonts/Virgil.woff2",
});

export const metadata: Metadata = {
  title: "Pantry Tracker",
  description: "Track your pantry items",
  // icons: {
  //   icon: '/favicon.ico',
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={virgil.className}>{children}</body>
    </html>
  );
}
