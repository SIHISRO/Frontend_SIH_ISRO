import type { Metadata } from "next";
import "./globals.css";
import { PredictionProvider } from "@/context/PredictionContext";
import { NavigationShell } from "@/components/layout/NavigationShell";
import { ComicClickEffect } from "@/components/common/ComicClickEffect";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Cosmic Vision — SIH26166 | Chandrayaan-2 Lunar Image Correspondence",
  description:
    "Cosmic Vision: Multi-modal, Sun angle and scale invariant image correspondence using Chandrayaan-2 optical images (OHRC, TMC-2, IIRS) and Lunar reference imagery. Built for ISRO / Smart India Hackathon 2026.",
  keywords: [
    "Cosmic Vision",
    "SIH2026",
    "SIH26166",
    "ISRO",
    "Chandrayaan-2",
    "OHRC",
    "TMC-2",
    "IIRS",
    "LoFTR",
    "Lunar Image Registration",
    "Homography",
  ],
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen text-black antialiased selection:bg-[#1283c8] selection:text-white">
        <PredictionProvider>
          <ComicClickEffect />
          <NavigationShell>{children}</NavigationShell>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#F3E6D6",
                border: "3px solid #000000",
                color: "#000000",
                fontWeight: 700,
                borderRadius: "10px",
                boxShadow: "4px 4px 0 0 #000000",
              },
            }}
          />
        </PredictionProvider>
      </body>
    </html>
  );
}
