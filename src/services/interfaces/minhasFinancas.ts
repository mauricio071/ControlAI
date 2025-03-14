import { TransactionType } from "./dashboardInterfaces";

export interface MinhasFinancasType {
  balance: number;
  totalIncome: number;
  totalExpense: number;
  incomes: TransactionType[];
  // expenses:
}

export interface BalanceType {
  id: string;
  balance: number;
}
