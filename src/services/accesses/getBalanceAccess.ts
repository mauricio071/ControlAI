import { collection, getDocs, query, where } from "firebase/firestore";

import { BalanceType } from "../interfaces/minhasFinancas";
import { auth, db } from "../../config/firebaseConfig";

export const getBalance = async (): Promise<BalanceType> => {
  const user = auth.currentUser;

  const balanceCollectionRef = collection(db, "saldos");

  const balanceQuery = query(
    balanceCollectionRef,
    where("uid", "==", user?.uid)
  );

  const querySnapshot = await getDocs(balanceQuery);
  const data = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return data[0] as BalanceType;
};
