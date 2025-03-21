import { Timestamp } from "firebase/firestore";
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
  uid: string;
  balance: number;
  created_at: Timestamp;
  updated_at: Timestamp;
}
