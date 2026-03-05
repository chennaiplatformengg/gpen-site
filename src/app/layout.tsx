import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GPEN — Global Platform Engineers Network",
  description:
    "A vibrant community of platform engineers, DevOps practitioners, and cloud enthusiasts pushing the boundaries of CI/CD, Infrastructure as Code, and developer experience.",
  keywords: [
    "Platform Engineering",
    "DevOps",
    "CI/CD",
    "Cloud Native",
    "Kubernetes",
    "Meetup",
    "GPEN",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0e1a] text-gray-200`}
      >
        {children}
      </body>
    </html>
  );
}
