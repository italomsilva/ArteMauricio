import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./layout/Header";
import "./globals.css";
import Footer from "./layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ArteMauricio",
  description: "Inspiração Litorânea transformada em Arte",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="favicon.ico" />
      </head>
      <body>
        <Header/>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
