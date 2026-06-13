"use client";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

function Header() {
  const { isSignedIn } = useUser();

  return (
    <header className="flex justify-end items-center p-4 gap-4 h-16">
      {isSignedIn ? (
        <UserButton />
      ) : (
        <>
          <SignInButton />
          <SignUpButton>
            <button className="bg-purple-700 text-white px-4 py-2 rounded">
              Sign Up
            </button>
          </SignUpButton>
        </>
      )}
    </header>
  );
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}