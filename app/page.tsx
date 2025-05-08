import Header from "@/components/header";
import TypingModeBox from "@/components/ui/typing-mode-box";
import { TypingMain } from "@/components/typing-components/typing-main";
import { Footer } from "@/components/footer";
import { Provider } from "react-redux";
import StoreProvider from "@/app/store-provider";
import SizeBox from "@/components/ui/size-box";
export default function Home() {
  return (
    <StoreProvider>
      <div className="flex h-screen max-h-screen w-full max-w-[1440px] flex-col items-center">
        <Header />
        {/*<TypingModeBox visability={true} />*/}
        <TypingMain />
        {/*<SizeBox className={"grow"} />*/}
        <Footer className={"sticky bottom-0"} />
      </div>
    </StoreProvider>
  );
}
