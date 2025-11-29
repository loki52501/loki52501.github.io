// src/app/layout.tsx
import type { Metadata } from "next";
import "../styles/globals.css"; // Assuming globals.css is in src/styles
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "A minimal portfolio built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <Navbar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
