import { Inter } from "next/font/google";
import GlobalState from "../context/index";
import "./globals.css";

import ClientLayout from "./clientLayout.js";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MedFix",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalState>
          <main className="flex min-h-screen flex-col ">
            <ClientLayout>{children}</ClientLayout>
          </main>
        </GlobalState>
      </body>
    </html>
  );
}
