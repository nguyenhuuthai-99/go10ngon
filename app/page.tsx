import Header from "@/components/header";
import TypingModeBox from "@/components/ui/typing-mode-box";
import { TypingMain } from "@/components/typing-main";
import { Footer } from "@/components/footer";
export default function Home() {
  return (
    <>
      <Header />
      <TypingModeBox visability={false} />
      <TypingMain />
      {/*<Footer />*/}
    </>
  );
}
