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
import { DashboardType } from "../interfaces/dashboardInterfaces";
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
      ...data,
      balance: await getBalance(data),
      lastYearTransactions: await getLastYearTransactions(data),
      yourExpenses: await getYourExpenses(),
      recentTransactions: await getRecentTransactions(data),
    };

    callBack(finalData as DashboardType);
  });
};

export const getBalance = async (dashboardInfo: DashboardType) => {
  const balance = await getDoc(doc(db, "saldos", dashboardInfo.balance?.id));
  return balance.data()?.balance;
};

export const getCompare = async () => {
  const user = auth.currentUser;

  const actualMonth = dayjs().month();
  const pastMonth = actualMonth - 1;

  try {
    const lastYearTransactionsCollection = collection(db, "saldos");
    const lastYearTransactionsQuery = query(
      lastYearTransactionsCollection,
      where("uid", "==", user?.uid),
      where("date", ">=", startYear),
      where("date", "<=", endYear),
      where("type", "==", "descontar")
    );
    const querySnapshot = await getDocs(lastYearTransactionsQuery);
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
  }
};

const getLastYearTransactions = async () => {
  const user = auth.currentUser;

  const startYear = dayjs().startOf("year").format("YYYY-MM-DD");
  const endYear = dayjs().endOf("year").format("YYYY-MM-DD");

  try {
    const lastYearTransactionsCollection = collection(
      db,
      "historicoTransacoes"
    );
    const lastYearTransactionsQuery = query(
      lastYearTransactionsCollection,
      where("uid", "==", user?.uid),
      where("date", ">=", startYear),
      where("date", "<=", endYear),
      where("type", "==", "descontar")
    );
    const querySnapshot = await getDocs(lastYearTransactionsQuery);
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
  }
};

const getYourExpenses = async () => {
  const user = auth.currentUser;

  try {
    const yourExpensesCollection = collection(db, "historicoTransacoes");
    const yourExpensesQuery = query(
      yourExpensesCollection,
      where("uid", "==", user?.uid)
    );
    const querySnapshot = await getDocs(yourExpensesQuery);
    const data = querySnapshot.docs
      .map((doc) => {
        const data = doc.data();
        if (data.type === "descontar") {
          return {
            value: doc.data().value,
            label: doc.data().category,
          };
        }
        return null;
      })
      .filter(Boolean);

    const yourExpenses = data.reduce((total, item) => {
      if (total[item?.label]) {
        total[item?.label] += item?.value;
      } else {
        total[item?.label] = item?.value;
      }
      return total;
    }, {} as { [key: string]: number });

    const result = Object.entries(yourExpenses).map(([label, value]) => ({
      label,
      value,
    }));

    return result;
  } catch (error) {
    console.error(error);
  }
};

const getRecentTransactions = async () => {
  const user = auth.currentUser;

  try {
    const recentTransactionsRef = collection(db, "historicoTransacoes");
    const transactionsQuery = query(
      recentTransactionsRef,
      where("uid", "==", user?.uid),
      orderBy("timestamp", "desc"),
      limit(5)
    );
    const querySnapshot = await getDocs(transactionsQuery);
    const recentTransactions = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return recentTransactions;
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
