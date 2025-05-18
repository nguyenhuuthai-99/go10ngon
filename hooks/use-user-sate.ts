import { collection, doc, getDoc, query, where } from "@firebase/firestore";
import { db } from "@/lib/infrastructure/api/services/firebase";

export function useUserSate() {
  function getCurrentUserWpm(uid: string) {}

  async function getUsernameByUid(uid: string) {
    try {
      const userDocRef = doc(db, "users", uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        return data.username || null;
      } else {
        console.error("Username not found");
        return null;
      }
    } catch (err) {
      console.error("Failed to fetch username", err);
      return null;
    }
  }

  return { getUsernameByUid };
}
