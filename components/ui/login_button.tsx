import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  logIn,
  logInWithGoogle,
  signUp,
} from "@/lib/infrastructure/api/services/userService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { Router } from "next/router";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import { setLoading } from "@/lib/redux/slice/user-authentication-slice";
import Loader from "@/components/ui/loader";
import { AuthError } from "@firebase/auth";

export function LoginButton() {
  const router = useRouter();
  const [isLoginFrame, setIsLoginFrame] = useState<boolean>(true);

  async function handleGoogle() {
    try {
      await logInWithGoogle();
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Dialog>
      <DialogTrigger className={"hover:text-primary cursor-pointer"}>
        đăng nhập
      </DialogTrigger>

      <DialogContent className={"grid grid-cols-1 place-items-center"}>
        <DialogHeader>
          <DialogTitle className={"text-center"}>
            {isLoginFrame ? "đăng nhập" : "đăng ký"}
          </DialogTitle>
        </DialogHeader>
        {isLoginFrame ? (
          <LoginFragment
            router={router}
            onRegisterFormRequest={() => setIsLoginFrame(false)}
          />
        ) : (
          <RegisterFragment
            router={router}
            onLoginFormRequest={() => setIsLoginFrame(true)}
          />
        )}

        <div className={"bg-border mt-2 h-0.5 w-full"} />
        <p>hoặc</p>
        <Button
          className={
            "bg-card text-foreground border-border hover:text-secondary-foreground cursor-pointer"
          }
          type="button"
          onClick={handleGoogle}
        >
          <FaGoogle />
          đăng nhập bằng Google
        </Button>
      </DialogContent>
    </Dialog>
  );
}

function LoginFragment({
  router,
  onRegisterFormRequest,
}: {
  router: AppRouterInstance;
  onRegisterFormRequest: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.authState.loading);

  async function handleLogin(e: FormEvent) {
    // if(loading) return;
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      await logIn(email, password);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
    dispatch(setLoading(false));
  }
  return (
    <form
      onSubmit={handleLogin}
      className="flex w-full max-w-[90%] flex-col items-center justify-center gap-2 md:max-w-[70%]"
    >
      <Input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <Input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <Button
        className={`bg-card text-foreground border-border hover:text-secondary-foreground w-full max-w-[60%] cursor-pointer ${loading && "cursor-not-allowed"}`}
        type="submit"
      >
        {loading ? <Loader /> : "đăng nhập"}
      </Button>
      <p className={"text-xs"}>
        Không có tài khoản?{" "}
        <span
          className={"text-primary cursor-pointer"}
          onClick={onRegisterFormRequest}
        >
          đăng kí
        </span>{" "}
        ngay
      </p>
    </form>
  );
}

function RegisterFragment({
  router,
  onLoginFormRequest,
}: {
  router: AppRouterInstance;
  onLoginFormRequest: () => void;
}) {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const loading = useAppSelector((state) => state.authState.loading);
  const dispatch = useAppDispatch();

  function isMatchPasswords() {
    return password === confirmPassword;
  }
  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    if (!isMatchPasswords()) {
      setErrorMessage("mật khẩu không trùng khớp");
      return;
    }
    dispatch(setLoading(true));
    try {
      await signUp(email, password, userName);
      router.push("/");
      e.persist();
    } catch (err) {
      // @ts-ignore
      if (err.message === "Nickname đã tồn tại") {
        // @ts-ignore
        setErrorMessage(err.message);
      }
      // @ts-ignore
      switch (err.code) {
        case "auth/email-already-in-use":
          setErrorMessage("Email đã được sử dụng");
          break;
        case "auth/weak-password":
          setErrorMessage("Mật khẩu quá yếu (tối thiểu 6 ký tự)");
          break;
        case "auth/invalid-email":
          setErrorMessage("Email không hợp lệ");
          break;
        default:
          setErrorMessage("Đăng ký thất bại");
      }
    }
    dispatch(setLoading(false));
  }

  return (
    <form
      onSubmit={handleRegister}
      className="flex w-full max-w-[90%] flex-col items-center justify-center gap-2 md:max-w-[70%]"
    >
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />{" "}
      <Input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="nickname"
        required
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="mật khẩu"
        required
      />
      <Input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="nhập lại mật khẩu"
        required
      />
      <div>{errorMessage}</div>
      <Button
        className={`bg-card text-foreground border-border hover:text-secondary-foreground w-full max-w-[60%] cursor-pointer ${loading && "cursor-not-allowed"}`}
        type="submit"
      >
        {loading ? <Loader /> : "đăng ký"}
      </Button>
      <p className={"text-xs"}>
        đã có tài khoản?{" "}
        <span
          className={"text-primary cursor-pointer"}
          onClick={onLoginFormRequest}
        >
          đăng nhập
        </span>{" "}
        ngay
      </p>
    </form>
  );
}
