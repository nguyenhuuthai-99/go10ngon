"use client";

import Header from "@/components/header";
import TypingModeBox from "@/components/ui/typing-mode-box";
import { TypingMain } from "@/components/typing-main";
import { Footer } from "@/components/footer";
import { Provider } from "react-redux";
import StoreProvider from "@/app/store-provider";
export default function Home() {
  return (
    <StoreProvider>
      <div className="flex w-full max-w-[1440px] flex-col items-center">
        <Header />
        {/*<TypingModeBox visability={true} />*/}
        <TypingMain className={"mt-8"} />
        {/*<Footer />*/}
      </div>
    </StoreProvider>
  );
}
