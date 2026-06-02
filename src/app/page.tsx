import { Header } from "@/components/ui/Header";
import { Messages } from "@/components/ui/Messages";
import { Sidebar } from "@/components/ui/Sidebar";
import { StarfieldBackground } from "@/components/ui/starfield";

export default function Home() {
  return (
    <StarfieldBackground>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Header />
          <Messages />
        </div>
      </div>
    </StarfieldBackground>


  );
}
