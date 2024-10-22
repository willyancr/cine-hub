import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import SideBar from "@/app/components/sidebar";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CineHub - Filmes, Séries e TV",
  description: "Seu Catálogo pessoal de Filmes e Séries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${nunito.className} flex antialiased mx-auto w-full max-w-[1200px] `}>
        <SideBar />
        {children}
      </body>
    </html>
  );
}
