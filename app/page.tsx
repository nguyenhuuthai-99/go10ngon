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
      <div className={"max-w-4xl"}>
        <Header />
        <TypingModeBox visability={false} />
        <TypingMain />
        {/*<Footer />*/}
      </div>
    </Provider>
  );
}
