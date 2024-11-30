import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Revenda Avenida",
  description: "Revenda de veículos em Pelotas-RS",
  keywords: ['Revenda', 'Carros', 'Veículos', 'Veículos usados']
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
