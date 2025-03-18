import {
  Box,
  Grid2 as Grid,
  Icon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";
import { pieArcLabelClasses, PieChart } from "@mui/x-charts";
import dayjs from "dayjs";

import {
  DashboardType,
  ExpenseType,
  TransactionType,
} from "../../services/interfaces/dashboardInterfaces";
import { getDashboardObserver } from "../../services/observers/dashboardObserver";
import { CLink, GridCard, TitleContainer } from "../../shared/components";
import { Loading } from "../../shared/components/loading/Loading";
import { FormatarMoeda } from "../../shared/utils/FormatarMoeda";
import { FormatarData } from "../../shared/utils/FormatarData";
import { LayoutBase } from "../../shared/layouts";
import { DashboardMiniCard } from "./components/DashboardMiniCard";

interface Dashboard {
  balance: number;
  monthlyExpense: number;
  monthlyFixed: number;
  savings: number;
}

export const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [currentMonthExpense, setCurrentMonthExpense] = useState(0);
  const [previousMonthlyExpense, setPreviousMnthlyExpense] = useState(0);
  const [monthlyFixed, setMonthlyFixed] = useState(0);
  const [savings, setSavings] = useState(0);

  const [pData, setPdata] = useState<number[]>([]);

  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  const xLabels = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  const [lastTransactions, setLastTransactions] = useState<TransactionType[]>(
    []
  );

  const [yourExpenses, setYourExpenses] = useState<ExpenseType[]>([]);

  const handleDashboardData = (data: DashboardType) => {
    setLoading(true);
    setBalance(data.balance);
    setCurrentMonthExpense(data.monthlyExpense.currentMonthValue);
    setPreviousMnthlyExpense(data.monthlyExpense.previousMonthValue);
    setMonthlyFixed(data.monthlyFixed);
    setSavings(data.savings);
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
    getDashboardObserver(handleDashboardData);
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
            title="Despesas fixos mensal"
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
          >
            {/* {compareValue(currentMonthExpense, previousMonthlyExpense) > 0 ? (
              <Icon color="error">arrow_upward</Icon>
            ) : (
              <Icon color="success">arrow_downward</Icon>
            )}

            <Typography
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {FormatarMoeda(
                compareValue(currentMonthExpense, previousMonthlyExpense)
              )}
              <Typography variant="caption" marginLeft="0.25rem">
                comparado ao mês anterior
              </Typography>
            </Typography> */}
          </DashboardMiniCard>
        </Grid>
      </Box>
      <Box>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, xl: 7 }}>
            <GridCard titleContainer>
              <TitleContainer title={`Seus gastos de ${dayjs().year()}`} />
              {loading ? (
                <Loading width="285px" height="285px" />
              ) : (
                <BarChart
                  slotProps={{ legend: { hidden: true } }}
                  height={300}
                  borderRadius={6}
                  margin={{ left: 100, right: 20, top: 20, bottom: 30 }}
                  series={[
                    {
                      data: pData,
                      label: "Gastou",
                      id: "id",
                      valueFormatter: (value) =>
                        `${FormatarMoeda(Number(value))}`,
                    },
                  ]}
                  xAxis={[
                    {
                      data: xLabels,
                      scaleType: "band",
                    },
                  ]}
                  yAxis={[
                    {
                      valueFormatter: (value) =>
                        `${FormatarMoeda(Number(value))}`,
                    },
                  ]}
                />
              )}
            </GridCard>
          </Grid>

          <Grid size={{ xs: 12, xl: 5 }}>
            <GridCard titleContainer>
              <TitleContainer title="Seus gastos deste mês" />
              {loading ? (
                <Loading width="285px" height="285px" />
              ) : yourExpenses.length > 0 ? (
                <PieChart
                  series={[
                    {
                      data: yourExpenses,
                      valueFormatter: (data) =>
                        `${FormatarMoeda(Number(data.value))}`,
                      arcLabel: (data) =>
                        `${FormatarMoeda(Number(data.value))}`,
                      arcLabelMinAngle: 35,
                      arcLabelRadius: "60%",
                      highlightScope: { fade: "global", highlight: "item" },
                      faded: {
                        additionalRadius: -30,
                        color: "gray",
                      },
                    },
                  ]}
                  sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                      fill: "white",
                    },
                  }}
                  height={300}
                />
              ) : (
                <Box
                  height={300}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography>Nenhum dado disponível</Typography>
                </Box>
              )}
            </GridCard>
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
