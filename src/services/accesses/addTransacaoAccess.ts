import { addDoc, collection, query, where } from "firebase/firestore";

import { TransactionType } from "../interfaces/dashboardInterfaces";
import { auth, db } from "../../config/firebaseConfig";
import dayjs from "dayjs";

export const addTransacaoAccess = async (body: TransactionType) => {
  const user = auth.currentUser;

  const addTransacaoCollectionRef = collection(db, "historicoTransacoes");

  try {
    const data = {
      uid: user?.uid,
      timestamp: dayjs().toDate(),
      ...body,
    };
    const response = await addDoc(addTransacaoCollectionRef, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};
