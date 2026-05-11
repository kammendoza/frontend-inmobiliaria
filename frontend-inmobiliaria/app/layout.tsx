import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

// Cargamos Montserrat
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Creciendo Juntos",
  description: "Inmobiliaria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* Aplicamos la fuente a toda la página */}
      <body className={montserrat.className}>
        {children}
      </body>
    </html>
  );
}