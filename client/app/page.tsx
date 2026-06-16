import FileUpload from "../components/FileUpload";
import ChatComponent from "../components/Chat";

export default function Home() {
  return (
    <div className="flex flex-1 h-[calc(100vh-4rem)] w-full overflow-hidden">
      {/* Left side: File Upload (30%) */}
      <div className="w-[30%] h-full p-6 border-r border-gray-200 bg-gray-50 flex flex-col overflow-y-auto">
        <FileUpload />
      </div>

      {/* Right side: Chat Interface (70%) */}
      <div className="w-[70%] h-full p-6 flex flex-col bg-white">
        <ChatComponent />
      </div>
    </div>
  );
}