import {
  deleteTransactionAccess,
  getAllExpensesAccess,
  getAllTransactionsAccess,
} from "../accesses/historicoAccess";
import { TransactionType } from "../interfaces/dashboardInterfaces";

export const getAllTransactionsAction = async (): Promise<
  TransactionType[]
> => {
  const data = await getAllTransactionsAccess();
  return data;
};

export const deleteTransactionAction = async (id: string) => {
  const data = await deleteTransactionAccess(id);
  return data;
};

export const getAllExpensesAction = async (
  year?: number
): Promise<number[]> => {
  const data = await getAllExpensesAccess(year);
  return data;
};
