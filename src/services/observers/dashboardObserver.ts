import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "../../config/firebaseConfig";
import {
  DashboardType,
  RecentTransactionsType,
} from "../interfaces/dashboardInterfaces";
import dayjs from "dayjs";

export const getDashboardObserver = async (
  callBack: (data: DashboardType) => void
) => {
  const user = auth.currentUser;

  const dashboardCollectionRef = collection(db, "dashboard");

  const dashboardQuery = query(
    dashboardCollectionRef,
    where("uid", "==", user?.uid)
  );

  return onSnapshot(dashboardQuery, async (collection) => {
    const dashboardInfo = collection.docs.map((doc) => ({
      ...(doc.data() as Partial<DashboardType>),
      id: doc.id,
    }));

    const data = dashboardInfo[0] as DashboardType;

    const finalData = {
      ...dashboardInfo[0],
      lastYearTransactions: await getLastYearTransactions(data),
      yourExpenses: await getYourExpenses(data),
      recentTransactions: await getRecentTransactions(data),
    };

    callBack(finalData as DashboardType);
  });
};

const getLastYearTransactions = async (dashboardInfo: DashboardType) => {
  const lastYearTransactions = await getDoc(
    doc(db, "gastosUltimoAno", dashboardInfo.lastYearTransactions?.id)
  );
  return lastYearTransactions.data();
};

const getYourExpenses = async (dashboardInfo: DashboardType) => {
  const yourExpenses = await getDoc(
    doc(db, "despesas", dashboardInfo.yourExpenses?.id)
  );

  return yourExpenses.data();
};

const getRecentTransactions = async (dashboardInfo: DashboardType) => {
  const recentTransactions = await getDoc(
    doc(db, "historicoTransacoes", dashboardInfo.recentTransactions?.id)
  );

  return recentTransactions.data();
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

//   const data: RecentTransactionsType = {
//     uid: user?.uid,
//     transactions: [
//       {
//         id: "1",
//         type: "descontar",
//         category: "lazer",
//         date: dayjs().format("YYYY-MM-DD"),
//         description: "Netflix",
//         value: 300,
//       },
//       {
//         id: "2",
//         type: "descontar",
//         category: "lazer",
//         date: dayjs().format("YYYY-MM-DD"),
//         description: "Jogo",
//         value: 200,
//       },
//       {
//         id: "3",
//         type: "adicionar",
//         category: "salario",
//         date: dayjs().format("YYYY-MM-DD"),
//         description: "Salário",
//         value: 100,
//       },
//       {
//         id: "4",
//         type: "adicionar",
//         category: "freelance",
//         date: dayjs().format("YYYY-MM-DD"),
//         description: "Freelance",
//         value: 3000,
//       },
//       {
//         id: "5",
//         type: "descontar",
//         category: "freelance",
//         date: dayjs().format("YYYY-MM-DD"),
//         description: "Spotify",
//         value: 10,
//       },
//     ],
//   };

//   await addDoc(gastosCollectionRef, data);
// };
