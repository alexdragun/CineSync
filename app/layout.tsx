import "./assets/styles/_typography.scss";
import "./globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/app/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cine Sync",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
