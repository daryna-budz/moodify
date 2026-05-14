import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import PlaylistPanel from "@/components/PlaylistPanel";


export default function Home() {
  return (
    <>
       <Navbar />
       <div className="flex flex-col md:flex-row">
          <PlaylistPanel />
          <Sidebar />
       </div>
    </>
  );
}
