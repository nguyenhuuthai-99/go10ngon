"use client";

import Header from "@/components/header";
import TypingModeBox from "@/components/ui/typing-mode-box";
import { TypingMain } from "@/components/typing-main";
import { Footer } from "@/components/footer";
import { Provider } from "react-redux";
import { store } from "@/app/store";
export default function Home() {
  return (
    <Provider store={store}>
      <div className="flex w-full max-w-[1440px] flex-col items-center">
        <Header />
        {/*<TypingModeBox visability={true} />*/}
        <TypingMain className={"mt-8"} />
        {/*<Footer />*/}
      </div>
    </Provider>
  );
}
