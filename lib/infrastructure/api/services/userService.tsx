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
  getDoc,
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
  if (!(await checkUsernameExisted(username))) {
    throw new Error("Nickname đã tồn tại");
  }

  const user = await createUserWithEmailAndPassword(auth, email, password);
  await addUsernameAndEmailToFirebase(user.user.uid, username, user.user.email);
};

export async function addUsernameAndEmailToFirebase(
  uid: string,
  username: string,
  email: string | null,
) {
  await setDoc(doc(db, "users", uid), {
    username: username,
    email: email,
  });
}

export async function checkUsernameExisted(username: string) {
  const q = query(collection(db, "users"), where("username", "==", username));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}

export async function hasUsername(uid: string) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  const data = docSnap.data();
  if (data) {
    return !!data.username;
  }
  return null;
}

export const logIn = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const logOut = () => signOut(auth);

export const logInWithGoogle = async () => {
  await signInWithPopup(auth, new GoogleAuthProvider());
};
