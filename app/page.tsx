import Header from "@/components/header";
import { TypingMain } from "@/components/typing-components/typing-main";
import { Footer } from "@/components/footer";
import StoreProvider from "@/app/store-provider";
export default function Home() {
  return (
    <StoreProvider>
      <div className="flex h-screen max-h-screen w-full max-w-[1440px] flex-col items-center">
        <Header />
        <TypingMain />
        <Footer className={"sticky bottom-0"} />
      </div>
    </StoreProvider>
  );
}
