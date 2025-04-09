import {
  addDoc,
  collection,
  Firestore,
  serverTimestamp,
} from "firebase/firestore";

export const createAllDocuments = async (
  dbInstance: Firestore,
  uid: string
) => {
  await createBalance(dbInstance, uid);
};

export const createBalance = async (
  dbInstance: Firestore,
  uid: string = ""
) => {
  const balanceCollectionRef = collection(dbInstance, "saldos");

  const data = {
    uid: uid,
    balance: 0,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  };

  await addDoc(balanceCollectionRef, data);
};
