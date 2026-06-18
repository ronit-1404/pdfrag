import { auth } from "@clerk/nextjs/server";
import FileUpload from "@/components/FileUpload";
import ChatComponent from "@/components/Chat";
import LandingPage from "@/components/LandingPage";

export default async function Home() {
  const { userId } = await auth();

  // Not signed in → show landing page
  if (!userId) {
    return <LandingPage />;
  }

  // Signed in → show the main app
  return (
    <div
      className="flex w-full overflow-hidden"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      {/* Left: Documents panel (30%) */}
      <aside className="w-[30%] h-full flex flex-col border-r border-[#3b2060]/40 bg-[#110d1f] overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          <FileUpload />
        </div>
      </aside>

      {/* Right: Chat panel (70%) */}
      <section className="w-[70%] h-full flex flex-col bg-[#0f0a1e] overflow-hidden">
        <ChatComponent />
      </section>
    </div>
  );
}