"use client";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

function Header() {
  const { isSignedIn } = useUser();

  return (
    <header className="flex justify-end items-center p-4 gap-4 h-16 border-b border-gray-200 bg-white">
      {isSignedIn ? (
        <UserButton />
      ) : (
        <>
          <SignInButton />
          <SignUpButton>
            <button className="bg-purple-700 text-white px-4 py-2 rounded font-medium hover:bg-purple-800 transition-colors">
              Sign Up
            </button>
          </SignUpButton>
        </>
      )}
    </header>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={jetbrainsMono.className}>
        <body className="bg-white text-gray-900 min-h-screen flex flex-col">
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}