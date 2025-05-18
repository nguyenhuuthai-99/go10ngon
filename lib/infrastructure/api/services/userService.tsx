import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "@firebase/auth";
import { auth, db } from "@/lib/infrastructure/api/services/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "@firebase/firestore";
export const signUp = async (
  email: string,
  password: string,
  username: string,
) => {
  const q = query(collection(db, "users"), where("username", "==", username));
  const snapshot = await getDocs(q);
  if (!snapshot.empty) throw new Error("Nickname đã tồn tại");

  const user = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, "users", user.user.uid), {
    email: email,
    username: username,
  });
};

export const logIn = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const logOut = () => signOut(auth);

export const logInWithGoogle = async () => {
  signInWithPopup(auth, new GoogleAuthProvider());
};
