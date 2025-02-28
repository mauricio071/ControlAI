export interface DashboardType {
  balance: number;
  lastYearTransactions: LastYearTransactionsType;
  monthlyExpense: number;
  monthlyFixed: number;
  yourExpenses: YourExpensesType;
  savings: number;
  uid: string;
}

export interface LastYearTransactionsType {
  uid: string;
  transactions: number[];
}

export interface YourExpensesType {
  uid: string;
  expenses: ExpenseType[];
}

export interface ExpenseType {
  label: string;
  value: number;
}

// export interface RecentTransactionsType {
//   uid: string;
//   transaction: TransactionType;
// }

export interface TransactionType {
  // uid: string;
  // id: string;
  type: "adicionar" | "descontar";
  date: string;
  description: string;
  category: string;
  value: number;
}
