import { BalanceType } from "./minhasFinancas";

export interface DashboardType {
  balance: BalanceType;
  monthlyFixed: number;
  monthlyExpense: MonthlyExpenseType;
  lastYearTransactions: number[];
  yourExpenses: ExpenseType[];
  recentTransactions: TransactionType[];
}

export interface MonthlyExpenseType {
  currentMonthValue: number;
  previousMonthValue: number;
}

export interface ExpenseType {
  label: string;
  value: number;
}

export interface GetExpensesType {
  currentMonthDetails: ExpenseType[];
  values: MonthlyExpenseType;
}

export interface TransactionType {
  id?: string;
  type: "adicionar" | "descontar";
  date: string;
  description: string;
  category: string;
  value: number;
}
export interface TransactionGraphType {
  value: number;
  label: string;
  date: string;
}
