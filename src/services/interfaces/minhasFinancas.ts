import { TransactionType } from "./dashboardInterfaces";

export interface MinhasFinancasType {
  balance: BalanceType;
  totalIncome: number;
  totalExpense: number;
  incomes: TransactionType[];
  // expenses:
}

export interface BalanceType {
  id: string;
  balance: number;
}
