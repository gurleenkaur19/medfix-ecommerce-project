import type { Metadata } from "next";
import { Inter } from "next/font/google";
import GlobalState from "../context/index";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MedFix",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalState>
          <main className="flex min-h-screen flex-col mt-[80px]">
            {children}
          </main>
        </GlobalState>
      </body>
    </html>
  );
}
