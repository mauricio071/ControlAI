import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import dayjs from "dayjs";

import { updateBalanceAction } from "../actions/minhasFinancasActions";
import { TransactionType } from "../interfaces/dashboardInterfaces";
import { BalanceType } from "../interfaces/minhasFinancas";
import { auth, db } from "../../config/firebaseConfig";

export interface TransactionAccessType {
  newBalance: BalanceType;
  transaction: TransactionType;
}

export const addTransacaoAccess = async (
  body: TransactionType
): Promise<TransactionAccessType> => {
  const user = auth.currentUser;

  const addTransacaoCollectionRef = collection(db, "historicoTransacoes");

  try {
    const balanceRef = collection(db, "saldos");
    const balanceQuery = query(balanceRef, where("uid", "==", user?.uid));
    const querySnapshot = await getDocs(balanceQuery);
    const balance = querySnapshot.docs.map((doc) => ({
      balance:
        doc.data().balance +
        (body.type === "descontar" ? -body.value : body.value),
      id: doc.id,
    }));

    const newBalance = await updateBalanceAction(balance[0] as BalanceType);

    const data = {
      uid: user?.uid,
      created_at: dayjs().toDate(),
      updated_at: dayjs().toDate(),
      ...body,
    };

    const response = await addDoc(addTransacaoCollectionRef, data);
    const snapData = await getDoc(response);

    return {
      newBalance,
      transaction: snapData.data() as TransactionType,
    };
  } catch (error) {
    console.error(error);
    return {} as TransactionAccessType;
  }
};
