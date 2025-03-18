import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { auth, db } from "../../config/firebaseConfig";

export const createAllDocuments = async () => {
  const uid = auth.currentUser?.uid;

  await createBalance(uid);
};

export const createBalance = async (uid: string = "") => {
  const balanceCollectionRef = collection(db, "saldos");

  const data = {
    uid: uid,
    balance: 0,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  };

  await addDoc(balanceCollectionRef, data);
};
