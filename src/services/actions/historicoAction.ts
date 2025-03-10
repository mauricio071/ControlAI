import {
  deleteTransactionAccess,
  getAllExpensesAccess,
  getAllTransactionsAccess,
} from "../accesses/historicoAccess";

export const getAllTransactionsAction = async () => {
  const data = await getAllTransactionsAccess();
  return data;
};

export const deleteTransactionAction = async (id: string) => {
  const data = await deleteTransactionAccess(id);
  return data;
};

export const getAllExpensesAction = async (year: number) => {
  const data = await getAllExpensesAccess(year);
  return data;
};
