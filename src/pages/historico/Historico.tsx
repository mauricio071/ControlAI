import { useState } from "react";

import { TransactionsHistories } from "./components/TransactionsHistories";
import { ExpensesHistories } from "./components/ExpensesHistories";
import { IncomesHistories } from "./components/IncomesHistories";
import { LayoutBase } from "../../shared/layouts";

export const Historico = () => {
  const [refreshToggle, setRefreshToggle] = useState(false);

  const refreshData = () => {
    setRefreshToggle((prev) => !prev);
  };

  return (
    <LayoutBase titulo="Histórico">
      <TransactionsHistories refreshData={refreshData} />

      <ExpensesHistories refreshToggle={refreshToggle} />
      <IncomesHistories refreshToggle={refreshToggle} />
    </LayoutBase>
  );
};
