import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import { auth } from "@/lib/infrastructure/api/services/firebase";

export const signUp = (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password);
};

export const logIn = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password);
};

export const logOut = () => signOut(auth);

export const logInWithGoogle = (email: string, password: string) => {};
