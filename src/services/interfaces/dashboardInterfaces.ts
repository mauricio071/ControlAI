export interface DashboardType {
  balance: number;
  lastYearTransactions: LastYearTransactionsType;
  monthlyExpense: number;
  monthlyFixed: number;
  yourExpenses: YourExpensesType;
  savings: number;
  uid: string;
  recentTransactions: RecentTransactionsType;
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

export interface RecentTransactionsType {
  uid: string;
  transactions: TransactionHistoryType[];
}

export interface TransactionHistoryType {
  id: string;
  type: "adicionar" | "descontar";
  date: string;
  description: string;
  category: string;
  value: number;
}
