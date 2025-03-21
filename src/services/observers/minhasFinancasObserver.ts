import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "../../config/firebaseConfig";
import {
  DashboardType,
  TransactionType,
} from "../interfaces/dashboardInterfaces";
import { MinhasFinancasType } from "../interfaces/minhasFinancas";

export const getMinhasFinancasObserver = async (
  callBack: (data: MinhasFinancasType) => void
) => {
  const user = auth.currentUser;

  const financasCollectionRef = collection(db, "saldos");

  const financasQuery = query(
    financasCollectionRef,
    where("uid", "==", user?.uid)
  );

  return onSnapshot(financasQuery, async (collection) => {
    const financasInfo = collection.docs.map((doc) => ({
      ...(doc.data() as Partial<MinhasFinancasType>),
      id: doc.id,
    }));

    const balance = await getBalance();

    const data = financasInfo[0] as MinhasFinancasType;
    const finalData = {
      ...data,
      // balance: { ...balance },
      // incomes: await getRendas(),
      //   lastYearTransactions: await getCurrentYearTransactions(data),
      //   yourExpenses: await getExpenses(data),
      //   recentTransactions: await getRecentTransactions(data),
    };

    callBack(finalData as MinhasFinancasType);
  });
};

export const getBalance = async () => {
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

  return data[0];
};
