"use client";
import * as React from "react";
import { UploadCloud } from "lucide-react";

const FileUpload: React.FC = () => {
    return (
        <div className="flex-1 flex flex-col h-full">
            <h2 className="text-xl font-bold mb-4">Upload Documents</h2>
            <div className="flex-1 border-2 border-dashed border-purple-300 rounded-xl bg-purple-50/50 flex flex-col justify-center items-center p-8 text-center hover:bg-purple-50 hover:border-purple-400 transition-all cursor-pointer group">
                <div className="bg-white p-4 rounded-full shadow-sm mb-4 group-hover:scale-105 transition-transform">
                    <UploadCloud className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-sm font-medium text-gray-700 mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PDF, DOCX, TXT</p>
            </div>
            
            <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Uploaded Files</h3>
                <div className="text-sm text-gray-500 italic text-center p-4 bg-white border rounded-lg shadow-sm">
                    No files uploaded yet.
                </div>
            </div>
        </div>
    );
}

export default FileUpload;