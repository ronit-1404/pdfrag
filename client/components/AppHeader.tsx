"use client";

import { useUser, UserButton } from "@clerk/nextjs";

export default function AppHeader() {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <header className="h-16 w-full flex justify-between items-center px-8 glass-panel sticky top-0 z-50 border-b border-[#3b2060]/50 shadow-[0_4px_30px_rgba(124,58,237,0.07)] shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#a855f7] flex items-center justify-center glow-box shrink-0">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-[18px] h-[18px]"
          >
            <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
        </div>
        <div>
          <span
            className="text-xl font-black text-[#7c3aed] tracking-tighter glow-text"
            style={{
              fontFamily:
                "var(--font-jetbrains, 'JetBrains Mono'), monospace",
            }}
          >
            PDFrag
          </span>
          <span className="ml-2 text-[10px] text-[#9d8ab0]/70 font-mono tracking-widest uppercase hidden sm:inline">
            AI Document Chat
          </span>
        </div>
      </div>

      {/* Right side — only show UserButton after sign-in */}
      {isLoaded && isSignedIn && (
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-emerald-400 font-mono font-medium">
              Connected
            </span>
          </div>
          <div className="w-px h-5 bg-[#3b2060]/60" />
          <UserButton
            appearance={{
              elements: {
                avatarBox: "!w-8 !h-8",
              },
            }}
          />
        </div>
      )}
    </header>
  );
}
