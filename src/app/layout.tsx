import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderBar from "./header-bar";
import ResponsiveAppBar from "./app-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gamesz",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ResponsiveAppBar />
        <div className="main-content">{children}</div>
      </body>
    </html>
  );
}
