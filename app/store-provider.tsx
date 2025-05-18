"use client";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "@/lib/store";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "@/lib/infrastructure/api/services/firebase";
import {
  setUser,
  UserState,
} from "@/lib/redux/slice/user-authentication-slice";
import { useUserSate } from "@/hooks/use-user-sate";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  const { getUsernameByUid } = useUserSate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      let userState: UserState = {
        email: null,
        uid: null,
        loading: false,
        wpm: 75,
        username: null,
      };
      if (user) {
        userState.email = user.email;
        userState.uid = user.uid;

        userState.username = await getUsernameByUid(user.uid);
      }
      if (storeRef.current) storeRef.current.dispatch(setUser(userState));
    });
    return () => unsubscribe();
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
