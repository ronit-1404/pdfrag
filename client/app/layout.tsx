import { ClerkProvider } from "@clerk/nextjs";
import { JetBrains_Mono, Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import AppHeader from "@/components/AppHeader";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-jetbrains",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PDFrag — Chat with your Documents",
  description:
    "AI-powered PDF chat. Upload any document and ask questions in natural language using Gemini AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#7c3aed",
          colorBackground: "#0f0a1e",
          colorText: "#f1e8ff",
          colorTextSecondary: "#9d8ab0",
          colorNeutral: "#3b2060",
          borderRadius: "0.75rem",
          fontFamily: "'Inter', sans-serif",
        },
        elements: {
          headerTitle: "!text-[#f1e8ff]",
          headerSubtitle: "!text-[#9d8ab0]",
          socialButtonsBlockButton:
            "!bg-[#1e1230] !border !border-[#3b2060] !text-[#f1e8ff] hover:!bg-[#2a1845]",
          formButtonPrimary:
            "!bg-gradient-to-r !from-[#7c3aed] !to-[#a855f7] hover:!opacity-90",
          formFieldInput:
            "!bg-[#1e1230] !border !border-[#3b2060] !text-[#f1e8ff] focus:!border-[#7c3aed]",
          footerActionLink: "!text-[#a855f7] hover:!text-[#c084fc]",
          dividerLine: "!bg-[#3b2060]",
          dividerText: "!text-[#9d8ab0]",
        },
      }}
    >
      <html lang="en" className={`${jetbrainsMono.variable} ${inter.variable}`}>
        {/* suppressHydrationWarning prevents noise from browser extensions (e.g. ATM) */}
        <body
          suppressHydrationWarning
          className="bg-[#0f0a1e] text-[#f1e8ff] min-h-screen flex flex-col"
          style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
        >
          {/* Ambient background orbs */}
          <div className="orb orb-1" aria-hidden="true" />
          <div className="orb orb-2" aria-hidden="true" />

          <AppHeader />

          <main className="relative z-10 flex flex-1 overflow-hidden">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}