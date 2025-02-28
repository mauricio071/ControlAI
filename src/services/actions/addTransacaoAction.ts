import { addTransacaoAccess } from "../accesses/addTransacaoAccess";
import { TransactionType } from "../interfaces/dashboardInterfaces";

export const addTransacaoAction = async (body: TransactionType) => {
  const data = await addTransacaoAccess(body);
  return data;
};
