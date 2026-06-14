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
            <h2 className="text-xl font-bold mb-4">Upload Documents</h2>

            <div
                onClick={handleFileUpload}
                className="flex-1 border-2 border-dashed border-purple-300 rounded-xl bg-purple-50/50 flex flex-col justify-center items-center p-8 text-center hover:bg-purple-50 hover:border-purple-400 transition-all cursor-pointer group"
            >
                <div className="bg-white p-4 rounded-full shadow-sm mb-4 group-hover:scale-105 transition-transform">
                    <UploadCloud className="w-8 h-8 text-purple-600" />
                </div>

                <p className="text-sm font-medium text-gray-700 mb-1">
                    Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">PDF, DOCX, TXT</p>
            </div>

            <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Uploaded Files
                </h3>
                {uploadedFiles.length > 0 ? (
                    <div className="space-y-2">
                        {uploadedFiles.map((fileName, index) => (
                            <div key={index} className="text-sm text-gray-700 p-3 bg-white border rounded-lg shadow-sm">
                                {fileName}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-sm text-gray-500 italic text-center p-4 bg-white border rounded-lg shadow-sm">
                        No files uploaded yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUpload;