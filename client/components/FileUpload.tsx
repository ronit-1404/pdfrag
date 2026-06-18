"use client";
import * as React from "react";
import { UploadCloud } from "lucide-react";

const FileUpload: React.FC = () => {
    const [uploadedFiles, setUploadedFiles] = React.useState<string[]>([]);

    const handleFileUpload = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".pdf,.docx,.txt";

        input.onchange = (e: any) => {
            const file = e.target.files[0];
            if (file) {
                console.log("Selected file:", file);
            }
        };
        input.addEventListener('change', async (ev) => {
            if (input.files && input.files.length > 0) {
                const file = input.files.item(0);
                if (file) {
                    const formdata = new FormData()
                    formdata.append('pdf', file)

                    await fetch('http://localhost:8000/upload/pdf',
                        {
                            method: 'POST',
                            body: formdata
                        }
                    );
                    setUploadedFiles(prev => [...prev, file.name]);
                    console.log("file uploaded")
                }
            }
        })
        input.click();
    };

    return (
        <div className="flex-1 flex flex-col h-full">

            {/* Section title */}
            <div className="mb-6">
                <h2
                    className="text-xl font-bold text-[#f1e8ff] mb-0.5"
                    style={{ fontFamily: "var(--font-jetbrains, 'JetBrains Mono'), monospace" }}
                >
                    Documents
                </h2>
                <p className="text-xs text-[#9d8ab0]">AI-Powered Analysis</p>
            </div>

            {/* Upload Zone */}
            <button
                onClick={handleFileUpload}
                className="w-full mb-6 p-8 rounded-xl border-2 border-dashed border-[#7c3aed]/35 bg-[#7c3aed]/5 hover:bg-[#7c3aed]/10 hover:border-[#7c3aed]/70 transition-all duration-300 group flex flex-col items-center justify-center gap-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/40"
            >
                <div className="w-12 h-12 rounded-full bg-[#231535] flex items-center justify-center text-[#7c3aed] group-hover:scale-110 transition-transform duration-300 shadow-lg glow-box">
                    <UploadCloud className="w-6 h-6" />
                </div>
                <div className="text-center">
                    <p className="font-medium text-[#f1e8ff] text-sm">
                        Click to upload or drag & drop
                    </p>
                    <p className="text-xs text-[#9d8ab0] mt-1">PDF, DOCX, TXT supported</p>
                </div>
            </button>

            {/* Uploaded Files */}
            <div className="flex-1 flex flex-col min-h-0">
                <h3 className="text-[10px] font-semibold text-[#9d8ab0] uppercase tracking-widest mb-3">
                    Active Files
                </h3>

                {uploadedFiles.length > 0 ? (
                    <div className="space-y-2 overflow-y-auto">
                        {uploadedFiles.map((fileName, index) => (
                            <div
                                key={index}
                                className="glass-card p-3 rounded-lg flex items-center gap-3 hover:bg-[#231535]/80 transition-colors cursor-default"
                            >
                                {/* PDF icon */}
                                <div className="w-8 h-8 rounded-md bg-red-500/15 text-red-400 flex items-center justify-center shrink-0">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9.5 8.5c0 .83-.67 1.5-1.5 1.5H7v2H5.5V9H8c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V9H13c.83 0 1.5.67 1.5 1.5v3zm4-3H17v1h1.5V13H17v2h-1.5V9h3v1.5z" />
                                    </svg>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-[#f1e8ff] truncate">{fileName}</p>
                                    <p className="text-[10px] text-[#9d8ab0]">Uploaded · Ready</p>
                                </div>

                                {/* Check icon */}
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-emerald-400 shrink-0">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="glass-card text-center p-6 rounded-xl flex flex-col items-center gap-2">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-[#9d8ab0]/50">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        <p className="text-sm text-[#9d8ab0] italic">No files uploaded yet</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUpload;