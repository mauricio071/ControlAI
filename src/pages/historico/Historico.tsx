import { TransactionsHistories } from "./components/TransactionsHistories";
import { ExpensesHistories } from "./components/ExpensesHistories";
import { LayoutBase } from "../../shared/layouts";
import { useState } from "react";

export const Historico = () => {
  const [refreshToggle, setRefreshToggle] = useState(false);

  const refreshData = () => {
    setRefreshToggle((prev) => !prev);
  };

  return (
    <LayoutBase titulo="Histórico">
      <TransactionsHistories refreshData={refreshData} />

      <ExpensesHistories refreshToggle={refreshToggle} />
    </LayoutBase>
  );
};
