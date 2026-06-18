"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    title: "Any Document",
    desc: "PDF, DOCX, TXT — all supported",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Instant Answers",
    desc: "RAG-powered by Gemini 2.5 Flash",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: "Secure & Private",
    desc: "Your documents never leave your control",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
];

export default function LandingPage() {
  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden w-full">

      {/* ── LEFT: Hero ── */}
      <div className="flex-1 flex flex-col justify-center px-10 lg:px-20 py-16 lg:py-0 border-b lg:border-b-0 lg:border-r border-[#3b2060]/30">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7c3aed]/10 border border-[#7c3aed]/25 text-[#c084fc] text-xs font-semibold mb-8 w-fit tracking-wide">
          <div className="w-1.5 h-1.5 rounded-full bg-[#c084fc] animate-pulse" />
          AI-Powered Document Intelligence
        </div>

        {/* Headline */}
        <h1
          className="text-5xl xl:text-6xl font-black text-[#f1e8ff] leading-[1.1] mb-5"
          style={{ fontFamily: "var(--font-jetbrains, 'JetBrains Mono'), monospace" }}
        >
          Chat with
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c084fc]">
            your PDFs
          </span>
        </h1>

        <p className="text-[#9d8ab0] text-lg leading-relaxed mb-10 max-w-md">
          Upload any document and ask questions in plain language.
          PDFrag uses AI to extract insights and answer queries instantly.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 mb-14">
          <SignUpButton mode="modal">
            <button className="group relative px-8 py-3.5 rounded-xl text-base font-semibold text-white overflow-hidden transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0">
              <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] transition-all" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#6d28d9] to-[#9333ea] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 rounded-xl shadow-[0_0_30px_rgba(124,58,237,0.5)] opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2">
                Get Started Free
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </button>
          </SignUpButton>

          <SignInButton mode="modal">
            <button className="px-8 py-3.5 rounded-xl text-base font-medium text-[#9d8ab0] border border-[#3b2060]/60 hover:text-[#f1e8ff] hover:border-[#7c3aed]/50 hover:bg-[#7c3aed]/5 transition-all duration-300">
              Sign In
            </button>
          </SignInButton>
        </div>

        {/* Feature cards */}
        <div className="flex flex-col gap-3 max-w-md">
          {features.map((f) => (
            <div key={f.title} className="flex items-center gap-4 p-4 glass-card rounded-xl hover:bg-[#231535]/80 transition-colors">
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${f.bg} ${f.color}`}>
                {f.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#f1e8ff]">{f.title}</p>
                <p className="text-xs text-[#9d8ab0] mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT: Visual / Preview ── */}
      <div className="hidden lg:flex w-[45%] xl:w-[42%] flex-col items-center justify-center px-10 py-12">
        {/* App preview mockup */}
        <div className="w-full max-w-sm glass-panel rounded-2xl border border-[#3b2060]/60 shadow-[0_0_80px_rgba(124,58,237,0.12)] overflow-hidden">

          {/* Mock header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#3b2060]/40 bg-[#1a1025]/60">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-gradient-to-br from-[#7c3aed] to-[#a855f7] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                  <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <span className="text-xs font-bold text-[#7c3aed]" style={{ fontFamily: "monospace" }}>PDFrag</span>
            </div>
            <div className="w-5 h-5 rounded-full bg-[#231535] border border-[#3b2060]/60" />
          </div>

          {/* Mock chat messages */}
          <div className="px-4 py-5 space-y-4 bg-[#0f0a1e]/50 min-h-[200px]">
            {/* AI message */}
            <div className="flex gap-2.5">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#7c3aed] to-[#a855f7] flex items-center justify-center shrink-0 mt-0.5">
                <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3">
                  <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2z" />
                </svg>
              </div>
              <div className="glass-card rounded-xl rounded-tl-sm px-3 py-2 text-[11px] text-[#f1e8ff]/80 leading-relaxed max-w-[85%]">
                Hello! I've analyzed your PDF. What would you like to know?
              </div>
            </div>

            {/* User message */}
            <div className="flex gap-2.5 justify-end">
              <div className="bg-gradient-to-br from-[#7c3aed] to-[#a855f7] rounded-xl rounded-tr-sm px-3 py-2 text-[11px] text-white leading-relaxed max-w-[80%] shadow-[0_2px_10px_rgba(124,58,237,0.3)]">
                Summarize the key findings from Chapter 3.
              </div>
            </div>

            {/* AI message */}
            <div className="flex gap-2.5">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#7c3aed] to-[#a855f7] flex items-center justify-center shrink-0 mt-0.5">
                <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3">
                  <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2z" />
                </svg>
              </div>
              <div className="glass-card rounded-xl rounded-tl-sm px-3 py-2 text-[11px] text-[#f1e8ff]/80 leading-relaxed max-w-[85%]">
                Chapter 3 covers revenue growth of <span className="text-[#c084fc] font-semibold">+24%</span> YoY driven by enterprise...
              </div>
            </div>
          </div>

          {/* Mock input */}
          <div className="px-4 py-3.5 border-t border-[#3b2060]/40 bg-[#1a1025]/50">
            <div className="flex items-center gap-2 bg-[#231535]/80 rounded-lg px-3 py-2 border border-[#3b2060]/50">
              <span className="flex-1 text-[10px] text-[#9d8ab0]/50">Ask a question...</span>
              <div className="w-5 h-5 rounded-md bg-gradient-to-r from-[#7c3aed] to-[#a855f7] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-2.5 h-2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <p className="text-[#9d8ab0]/50 text-xs mt-6 text-center font-mono">
          No credit card required · Free to start
        </p>
      </div>
    </div>
  );
}
