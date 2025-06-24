import { Header } from "@/features/site/components/(home)/Header";
import { Footer } from "@/features/site/components/(home)/Footer";
import { Content } from "@/features/site/components/(home)/Content";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
