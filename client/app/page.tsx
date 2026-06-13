
import FileUpload from "../components/FileUpload";

export default function Home() {
  return (
    <div className="flex flex-1 h-[calc(100vh-4rem)] w-full overflow-hidden">
      {/* Left side: File Upload (30%) */}
      <div className="w-[30%] h-full p-6 border-r border-gray-200 bg-gray-50 flex flex-col overflow-y-auto">
        <FileUpload />
      </div>
      
      {/* Right side: Chat Interface (70%) */}
      <div className="w-[70%] h-full p-6 flex flex-col bg-white">
        <div className="flex-1 flex flex-col h-full max-h-full">
          <h2 className="text-2xl font-bold mb-4">Chat Interface</h2>
          
          {/* Chat History Area */}
          <div className="flex-1 border border-gray-200 rounded-xl p-4 bg-gray-50 flex flex-col items-center justify-center text-gray-500 overflow-y-auto shadow-inner">
            <p className="text-center">Your chat messages will appear here.</p>
          </div>
          
          {/* Input Area */}
          <div className="mt-4 flex gap-3">
            <input 
              type="text" 
              placeholder="Ask a question about your documents..." 
              className="flex-1 border border-gray-300 rounded-xl p-4 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all shadow-sm"
            />
            <button className="bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-purple-800 transition-colors shadow-sm">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}