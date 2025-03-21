import {
  Box,
  Grid2 as Grid,
  Icon,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";

import {
  DashboardType,
  ExpenseType,
  TransactionType,
} from "../../services/interfaces/dashboardInterfaces";
import { getDashboardAction } from "../../services/actions/dashboardAction";
import { CLink, GridCard, TitleContainer } from "../../shared/components";
import { DashboardMiniCard } from "./components/DashboardMiniCard";
import { YourExpensesGraph } from "./components/YourExpensesGraph";
import { Loading } from "../../shared/components/loading/Loading";
import { CurrentYearGraph } from "./components/CurrentYearGraph";
import { FormatarMoeda } from "../../shared/utils/FormatarMoeda";
import { FormatarData } from "../../shared/utils/FormatarData";
import { LayoutBase } from "../../shared/layouts";

interface Dashboard {
  balance: number;
  monthlyExpense: number;
  monthlyFixed: number;
  savings: number;
}

export const Dashboard = () => {
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  const [balance, setBalance] = useState(0);
  const [monthlyFixed, setMonthlyFixed] = useState(0);
  const [currentMonthExpense, setCurrentMonthExpense] = useState(0);
  const [previousMonthlyExpense, setPreviousMonthlyExpense] = useState(0);

  const [pData, setPdata] = useState<number[]>([]);
  const [yourExpenses, setYourExpenses] = useState<ExpenseType[]>([]);

  const [lastTransactions, setLastTransactions] = useState<TransactionType[]>(
    []
  );

  const handleDashboardData = (data: DashboardType) => {
    setLoading(true);
    setBalance(Number(data.balance.balance));
    setMonthlyFixed(data.monthlyFixed);
    setCurrentMonthExpense(data.monthlyExpense.currentMonthValue);
    setPreviousMonthlyExpense(data.monthlyExpense.previousMonthValue);
    setPdata(data.lastYearTransactions);
    setYourExpenses(data.yourExpenses);
    setLastTransactions(data.recentTransactions);
    setLoading(false);
  };

  const compareValue = (
    currentMonthValue: number,
    previousMonthValue: number
  ) => {
    const result = currentMonthValue - previousMonthValue;
    return result;
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardAction(handleDashboardData);
  }, []);

  return (
    <LayoutBase titulo="Dashboard">
      <Box marginTop={mdDown ? "2rem" : "0"}>
        <Grid container spacing={3}>
          <DashboardMiniCard
            icon="account_balance_wallet"
            color="linear-gradient(195deg, #49a3f1, #1A73E8)"
            textColor={balance < 0 ? "error" : ""}
            title="Saldo"
            value={balance}
            to="/minhas-financas"
            loading={loading}
          />
          <DashboardMiniCard
            icon="credit_card"
            color="linear-gradient(195deg, #FFB6C1, #FF1493)"
            title="Gasto mensal"
            value={monthlyFixed}
            to="/minhas-financas"
            loading={loading}
          />
          <DashboardMiniCard
            icon="home"
            color="linear-gradient(195deg, #FF8A00, #FF5E00)"
            title="Gastos deste mês"
            value={currentMonthExpense}
            to="/historico"
            loading={loading}
          />
          <DashboardMiniCard
            icon="trending_up"
            color="linear-gradient(195deg, #66BB6A, #388E3C)"
            textColor={
              compareValue(currentMonthExpense, previousMonthlyExpense) < 0
                ? "success"
                : "error"
            }
            title="Economia (vs mês passado)"
            value={compareValue(currentMonthExpense, previousMonthlyExpense)}
            to="/historico"
            loading={loading}
          />
        </Grid>
      </Box>
      <Box>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, xl: 7 }}>
            <CurrentYearGraph pData={pData} loading={loading} />
          </Grid>

          <Grid size={{ xs: 12, xl: 5 }}>
            <YourExpensesGraph yourExpenses={yourExpenses} loading={loading} />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <GridCard titleContainer>
          <TitleContainer title="Últimas transações" />
          {loading ? (
            <Loading width="285px" height="285px" />
          ) : lastTransactions.length === 0 ? (
            <Box display="flex" justifyContent="center" marginBottom="1rem">
              <Typography>Nenhum dado encontrado</Typography>
            </Box>
          ) : (
            <>
              <Box display="flex" flexDirection="column" gap="1rem">
                {lastTransactions.map((transaction) => (
                  <Box
                    sx={{
                      border: "1px solid lightGray",
                      borderRadius: "0.5rem",
                      padding: "1rem",
                    }}
                    key={transaction.id}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      gap="1"
                    >
                      <Box display="flex" alignItems="center" gap="1rem">
                        {transaction.type === "adicionar" ? (
                          <Icon color="success" sx={{ fontSize: "2.25rem" }}>
                            arrow_circle_up
                          </Icon>
                        ) : (
                          <Icon color="error" sx={{ fontSize: "2.25rem" }}>
                            arrow_circle_down
                          </Icon>
                        )}
                        <Box display="flex" flexDirection="column">
                          <Typography variant="body1" fontWeight="bold">
                            {transaction.description}
                          </Typography>
                          <Typography variant="body1" fontWeight="500">
                            {FormatarData(transaction.date)}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        fontWeight="bold"
                        color={
                          transaction.type === "adicionar" ? "success" : "error"
                        }
                        sx={{ fontSize: "1.25rem" }}
                      >
                        {transaction.type === "adicionar" ? "+ " : "- "}
                        {FormatarMoeda(transaction.value)}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box display="flex" justifyContent="center" marginTop="2rem">
                <CLink
                  to="/historico"
                  color="#1976D2"
                  hovercolor="#1565C0"
                  tdecoration="true"
                >
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    display="flex"
                    alignItems="center"
                    gap="0.5rem"
                  >
                    <Icon>history</Icon>
                    Histórico completo
                  </Typography>
                </CLink>
              </Box>
            </>
          )}
        </GridCard>
      </Box>
    </LayoutBase>
  );
};
