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

    const expenses = await getExpenses();

    const finalData = {
      ...data,
      balance: await getBalance(data),
      monthlyExpense: expenses?.values,
      //TODO remover o recent e filtrar 5 pelo front
      lastYearTransactions: await getLastYearTransactions(),
      yourExpenses: expenses?.currentMonthDetails,
      recentTransactions: await getRecentTransactions(),
    };

    callBack(finalData as DashboardType);
  });
};

export const getBalance = async (dashboardInfo: DashboardType) => {
  const balance = await getDoc(doc(db, "saldos", dashboardInfo.balance?.id));
  return balance.data()?.balance;
};

// export const compareExpense = async () => {
//   //TODO
//   const user = auth.currentUser;

//   const currentMonth = dayjs()..format("YYYY-MM");
//   const previousMonth = dayjs().endOf("year").format("YYYY-MM-DD");

//   try {
//     const lastYearTransactionsCollection = collection(
//       db,
//       "historicoTransacoes"
//     );
//     const lastYearTransactionsQuery = query(
//       lastYearTransactionsCollection,
//       where("uid", "==", user?.uid),
//       where("date", ">=", startYear),
//       where("date", "<=", endYear),
//       where("type", "==", "descontar")
//     );
//     const querySnapshot = await getDocs(lastYearTransactionsQuery);
//     const data = querySnapshot.docs.map((doc) => ({
//       date: doc.data().date,
//       value: doc.data().value,
//     }));

//     const monthlyArr = Array(12).fill(0);

//     data.forEach((item) => {
//       const date = dayjs(item.date).month();
//       monthlyArr[date] += item.value;
//     });

//     return monthlyArr;
//   } catch (error) {
//     console.error(error);
//   }
// };

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

const fetchExpenses = async (userUid: string | undefined) => {
  const expensesCollection = collection(db, "historicoTransacoes");

  const startPreviousMonth = dayjs()
    .subtract(1, "month")
    .startOf("month")
    .format("YYYY-MM-DD");

  const endCurrentMonth = dayjs().endOf("month").format("YYYY-MM-DD");

  const expensesQuery = query(
    expensesCollection,
    where("uid", "==", userUid),
    where("date", ">=", startPreviousMonth),
    where("date", "<=", endCurrentMonth)
  );

  const snapshot = await getDocs(expensesQuery);

  return snapshot.docs
    .map((doc) => {
      const data = doc.data();

      if (data.type === "descontar") {
        return {
          value: data.value,
          label: data.category,
          date: data.date,
        };
      }
      return null;
    })
    .filter(Boolean);
};

const groupExpensesByCategory = (
  expenses: { label: string; value: number; date: string }[]
) => {
  return expenses.reduce<Record<string, number>>((total, item) => {
    total[item.label] = (total[item.label] || 0) + item.value;
    return total;
  }, {});
};

const getExpenses = async () => {
  const user = auth.currentUser;

  try {
    const expenses = await fetchExpenses(user?.uid);
    const currentMonth = dayjs().startOf("month").format("YYYY-MM-DD");

    const currentMonthData = expenses.filter(
      (item) => item?.date >= currentMonth
    );
    const previousMonthData = expenses.filter(
      (item) => item?.date < currentMonth
    );

    const currentMonthExpenses = groupExpensesByCategory(currentMonthData);
    const previousMonthExpenses = groupExpensesByCategory(previousMonthData);

    const currentMonthDetails = Object.entries(currentMonthExpenses).map(
      ([label, value]) => ({
        label,
        value,
      })
    );

    const currentMonthValue = Object.values(currentMonthExpenses).reduce(
      (total, value) => total + value,
      0
    );

    const previousMonthValue = Object.values(previousMonthExpenses).reduce(
      (total, value) => total + value,
      0
    );

    return {
      currentMonthDetails,
      values: {
        currentMonthValue,
        previousMonthValue,
      },
      // Se precisar pegar as informações detalhadas do mês anterior
      // previousMonth: Object.entries(previousMonthExpenses).map(
      //   ([label, value]) => ({
      //     label,
      //     value,
      //   })
      // ),
    };
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
