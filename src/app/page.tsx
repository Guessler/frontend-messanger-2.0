import { Header } from "@/components/ui/Header";
import { Sidebar } from "@/components/ui/Sidebar";
import { StarfieldBackground } from "@/components/ui/starfield";

export default function Home() {
  return (
    <StarfieldBackground>
      <Header/>
      <Sidebar/>
    </StarfieldBackground>


  );
}
