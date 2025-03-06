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

  const financasCollectionRef = collection(db, "minhasFinancas");

  const financasQuery = query(
    financasCollectionRef,
    where("uid", "==", user?.uid)
  );

  return onSnapshot(financasQuery, async (collection) => {
    const financasInfo = collection.docs.map((doc) => ({
      ...(doc.data() as Partial<MinhasFinancasType>),
      id: doc.id,
    }));

    const data = financasInfo[0] as MinhasFinancasType;

    const finalData = {
      ...data,
      balance: await getBalance(data),
      incomes: await getIncomes(),
      //   lastYearTransactions: await getLastYearTransactions(data),
      //   yourExpenses: await getYourExpenses(data),
      //   recentTransactions: await getRecentTransactions(data),
    };

    callBack(finalData as MinhasFinancasType);
  });
};

export const getBalance = async (data: MinhasFinancasType) => {
  const balance = await getDoc(doc(db, "saldos", data.balance?.id));

  return balance.data()?.balance;
};

export const getIncomes = async () => {
  const user = auth.currentUser;

  try {
    const incomesRef = collection(db, "rendas");
    const incomesQuery = query(
      incomesRef,
      where("uid", "==", user?.uid),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(incomesQuery);
    const incomes = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return incomes;
  } catch (error) {
    console.error(error);
  }
};

export const getExpenses = async () => {
  const user = auth.currentUser;

  try {
    const expensesRef = collection(db, "despesas");
    const expensesQuery = query(
      expensesRef,
      where("uid", "==", user?.uid),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(expensesQuery);
    const expenses = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return expenses;
  } catch (error) {
    console.error(error);
  }
};

// export const addDashboardData = async (body, id) => {
//   const gastosCollectionRef = collection(db, "gastosUltimoAno");

//   const user = auth.currentUser;

//   await addDoc(gastosCollectionRef, {
//     uid: user?.uid,
//     transactions: [
//       12324, 2354, 234, 34325, 5436, 1234, 345, 425, 234, 123, 345,
//     ],
//   });
// };

// export const addDashboardData = async () => {
//   const gastosCollectionRef = collection(db, "despesas");

//   const user = auth.currentUser;

//   await addDoc(gastosCollectionRef, {
//     uid: user?.uid,
//     expenses: [
//       {
//         label: "Alimentação",
//         value: 80,
//       },
//       {
//         label: "Transporte",
//         value: 180,
//       },
//       {
//         label: "Saúde",
//         value: 280,
//       },
//     ],
//   });
// };

// export const addDashboardData = async () => {
//   const gastosCollectionRef = collection(db, "historicoTransacoes");

//   const user = auth.currentUser;

//   const data: TransactionType = {
//     uid: user?.uid,
//     // type: "descontar",
//     // category: "lazer",
//     // date: dayjs().format("YYYY-MM-DD"),
//     // description: "Netflix",
//     // value: 300,
//     // type: "adicionar",
//     // category: "salario",
//     // date: dayjs().format("YYYY-MM-DD"),
//     // description: "Salário",
//     // value: 100,
//     // type: "adicionar",
//     // category: "freelance",
//     // date: dayjs().format("YYYY-MM-DD"),
//     // description: "Freelance",
//     // value: 3000,
//     type: "descontar",
//     category: "freelance",
//     date: dayjs().format("YYYY-MM-DD HH:mm"),
//     description: "Teste4",
//     value: 1000,
//     timestamp: dayjs().toDate(),
//   };

//   await addDoc(gastosCollectionRef, data);
// };

export const addDashboardData = async () => {
  const gastosCollectionRef = collection(db, "saldos");

  const user = auth.currentUser;

  const data = {
    uid: user?.uid,
    balance: 3000,
  };

  await addDoc(gastosCollectionRef, data);
};
