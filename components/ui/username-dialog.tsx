"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FormEvent, MouseEventHandler, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import {
  checkUsernameExisted,
  hasUsername,
  addUsernameAndEmailToFirebase,
} from "@/lib/infrastructure/api/services/userService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { setUser } from "@/lib/redux/slice/user-authentication-slice";
import { useRouter } from "next/navigation";

export function UsernameDialog() {
  const [canOpen, setCanOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const auth = useAppSelector((state) => state.authState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!auth.username && auth.uid) {
      setCanOpen(true);
    }
  }, [auth]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (await checkUsernameExisted(username)) {
        setError("nickname đã tồn tại");
      } else {
        dispatch(setUser({ ...auth, username: username }));
        await addUsernameAndEmailToFirebase(auth.uid!, username, auth.email);
        setCanOpen(false);
      }
    } catch (e) {
      console.error(e);
      // @ts-ignore
      setError(e.message);
    }
    setLoading(false);
  }

  return (
    <Dialog open={canOpen}>
      <DialogContent>
        <DialogTitle>nickname của bạn là gì</DialogTitle>
        <form
          onSubmit={onSubmit}
          className={"flex flex-col items-center justify-center gap-3"}
        >
          <Input
            value={username}
            placeholder={"nhập nickname của bạn"}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            required={true}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button disabled={loading} type={"submit"}>
            {loading ? <Loader /> : "xác nhận"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
