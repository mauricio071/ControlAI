import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";

export const getAllTransactionsAccess = async () => {
  const user = auth.currentUser;

  try {
    const transactionsRef = collection(db, "historicoTransacoes");
    const transactionsQuery = query(
      transactionsRef,
      where("uid", "==", user?.uid),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(transactionsQuery);
    const transactions = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return transactions;
  } catch (error) {
    console.error(error);
  }
};

export const deleteTransactionAccess = async (id: string) => {
  try {
    const transaction = doc(db, "historicoTransacoes", id);
    const response = await deleteDoc(transaction);
    return response;
  } catch (error) {
    console.error(error);
  }
};
