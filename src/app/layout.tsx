import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Code-profile.",
  description: "Generate your code-profile card.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <SessionWrapper>
          <Toaster />
          <Navbar />
          {children}
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
