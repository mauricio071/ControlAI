import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import dayjs from "dayjs";

import { TransactionType } from "../interfaces/dashboardInterfaces";
import { auth, db } from "../../config/firebaseConfig";

export const getAllTransactionsAccess = async (): Promise<
  TransactionType[]
> => {
  const user = auth.currentUser;

  try {
    const transactionsRef = collection(db, "historicoTransacoes");
    const transactionsQuery = query(
      transactionsRef,
      where("uid", "==", user?.uid),
      orderBy("updated_at", "desc")
    );
    const querySnapshot = await getDocs(transactionsQuery);
    const transactions = querySnapshot.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id,
        } as TransactionType)
    );

    return transactions;
  } catch (error) {
    console.error(error);
    return [];
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

export const getAllExpensesAccess = async (
  year?: number
): Promise<number[]> => {
  const user = auth.currentUser;

  try {
    const expensesHistoryRef = collection(db, "historicoTransacoes");
    const expensesHistoryQuery = query(
      expensesHistoryRef,
      where("uid", "==", user?.uid),
      where("date", ">=", `${year}-01-01`),
      where("date", "<=", `${year}-12-31`),
      where("type", "==", "descontar")
    );
    const querySnapshot = await getDocs(expensesHistoryQuery);
    const data = querySnapshot.docs.map((doc) => ({
      date: doc.data().date,
      value: doc.data().value,
    }));

    const monthlyArr = Array(12).fill(0);

    data.forEach((item) => {
      const date = dayjs(item.date).month();
      monthlyArr[date] += item.value;
    });

    return monthlyArr;
  } catch (error) {
    console.error(error);
    return Array(12).fill(0);
  }
};
