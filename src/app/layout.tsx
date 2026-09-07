import type { Metadata } from "next";
import "./globals.css";
import { PredictionProvider } from "@/context/PredictionContext";
import { NavigationShell } from "@/components/layout/NavigationShell";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "LunarReg — SIH26166 | Chandrayaan-2 Lunar Image Correspondence",
  description:
    "Multi-modal, Sun angle and scale invariant image correspondence using Chandrayaan-2 optical images (OHRC, TMC-2, IIRS) and Lunar reference imagery. Built for ISRO / Smart India Hackathon 2026.",
  keywords: [
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen text-black antialiased selection:bg-black selection:text-[#DEF915]">
        <PredictionProvider>
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
