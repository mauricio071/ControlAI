import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import dayjs from "dayjs";

import { updateBalanceAction } from "../actions/minhasFinancasActions";
import { TransactionType } from "../interfaces/dashboardInterfaces";
import { auth, db } from "../../config/firebaseConfig";

export const addTransacaoAccess = async (body: TransactionType) => {
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

    await updateBalanceAction(balance[0]);

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
