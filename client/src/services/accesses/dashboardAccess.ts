import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import dayjs from "dayjs";

import {
  DashboardType,
  ExpenseType,
  GetExpensesType,
  TransactionGraphType,
  TransactionType,
} from "../interfaces/dashboardInterfaces";
import { CATEGORIAS_DESPESA } from "../../shared/constants/Categorias";
import { getDespesasAction } from "../actions/minhasFinancasActions";
import { getBalance } from "../actions/getBalanceAction";
import { auth, db } from "../../config/firebaseConfig";

export const getDashboardAccess = async (): Promise<DashboardType> => {
  const balance = await getBalance();
  const monthlyFixedArr = await getDespesasAction();
  const monthlyFixedValue = monthlyFixedArr?.reduce(
    (total, item) => item.value + total,
    0
  );
  const expenses = await getExpenses();

  return {
    balance: balance,
    monthlyFixed: monthlyFixedValue,
    monthlyExpense: expenses?.values,
    lastYearTransactions: await getCurrentYearTransactions(),
    yourExpenses: expenses?.currentMonthDetails,
    recentTransactions: await getRecentTransactions(),
  };
};

export const getCurrentYearTransactions = async (): Promise<number[]> => {
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
    return Array(12).fill(0);
  }
};

const fetchExpenses = async (
  userUid: string | undefined
): Promise<TransactionGraphType[]> => {
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
    .filter(Boolean) as TransactionGraphType[];
};

const groupExpensesByCategory = (
  expenses: { label: string; value: number; date: string }[]
) => {
  return expenses.reduce<Record<string, number>>((total, item) => {
    total[item.label] = (total[item.label] || 0) + item.value;
    return total;
  }, {});
};

export const getExpenses = async (): Promise<GetExpensesType> => {
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
      ([label, value]) => {
        const categoryLabel = CATEGORIAS_DESPESA.find(
          (category) => category.value === label
        );
        return {
          label: categoryLabel?.label,
          value,
        };
      }
    ) as ExpenseType[];

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
    return {
      currentMonthDetails: [{ label: "", value: 0 }],
      values: {
        currentMonthValue: 0,
        previousMonthValue: 0,
      },
    };
  }
};

const getRecentTransactions = async (): Promise<TransactionType[]> => {
  const user = auth.currentUser;

  try {
    const recentTransactionsRef = collection(db, "historicoTransacoes");
    const transactionsQuery = query(
      recentTransactionsRef,
      where("uid", "==", user?.uid),
      orderBy("updated_at", "desc"),
      limit(5)
    );
    const querySnapshot = await getDocs(transactionsQuery);
    const recentTransactions = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return recentTransactions as TransactionType[];
  } catch (error) {
    console.error(error);
    return [];
  }
};
