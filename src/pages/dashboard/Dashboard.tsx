import {
  Box,
  Button,
  Grid2 as Grid,
  Icon,
  Skeleton,
  Typography,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts";
import { Link } from "react-router-dom";

import { CLink, GridCard, TitleContainer } from "../../shared/components";
import { LayoutBase } from "../../shared/layouts";
import { FormatarMoeda } from "../../shared/utils/FormatarMoeda";
import { useEffect, useState } from "react";
import {
  addDashboardData,
  getDashboardObserver,
} from "../../services/observers/dashboardObserver";
import {
  DashboardType,
  ExpenseType,
  TransactionType,
} from "../../services/interfaces/dashboardInterfaces";
import { Loading } from "../../shared/components/loading/Loading";
import { FormatarData } from "../../shared/utils/FormatarData";
import { updateProfile } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

interface Dashboard {
  balance: number;
  monthlyExpense: number;
  monthlyFixed: number;
  savings: number;
}

export const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState(0);
  const [monthlyFixed, setMonthlyFixed] = useState(0);
  const [savings, setSavings] = useState(0);

  const gridContents = [
    {
      icon: "account_balance_wallet",
      color: "linear-gradient(195deg, #49a3f1, #1A73E8)",
      title: "Saldo",
      value: balance,
      to: "/minhas-financas",
    },
    {
      icon: "home",
      color: "linear-gradient(195deg, #FF8A00, #FF5E00)",
      title: "Gasto Fixo Mensal",
      value: monthlyExpense,
      to: "/minhas-financas",
    },
    {
      icon: "credit_card",
      color: "linear-gradient(195deg, #FFB6C1, #FF1493)",
      title: "Gasto do Mês",
      value: monthlyFixed,
      to: "/historico",
    },
    {
      icon: "trending_up",
      color: "linear-gradient(195deg, #66BB6A, #388E3C)",
      title: "Economia",
      value: savings,
      to: "/historico",
    },
  ];

  const [pData, setPdata] = useState<number[]>([]);

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
    setMonthlyExpense(data.monthlyExpense);
    setMonthlyFixed(data.monthlyFixed);
    setSavings(data.savings);
    setPdata(data.lastYearTransactions.transactions);
    setYourExpenses(data.yourExpenses);
    setLastTransactions(data.recentTransactions);
    setLoading(false);
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardObserver(handleDashboardData);
  }, []);

  return (
    <LayoutBase titulo="Dashboard">
      <Box>
        <Grid container spacing={3}>
          {gridContents.map((content) => (
            <Grid size={{ xs: 12, md: 6, xl: 3 }} key={content.title}>
              <GridCard>
                <Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="start"
                    gap="0.75rem"
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      width="100%"
                    >
                      <Typography textAlign="start" color="gray">
                        {content.title}
                      </Typography>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="4rem"
                        width="4rem"
                        borderRadius="0.75rem"
                        boxShadow="0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
                        marginTop="-2.5rem"
                        color="white"
                        sx={{
                          background: content.color,
                        }}
                      >
                        <Icon sx={{ fontSize: "1.75rem" }}>{content.icon}</Icon>
                      </Box>
                    </Box>
                    {loading ? (
                      <Skeleton variant="rounded" width="100%" height={68} />
                    ) : (
                      <Box
                        display="flex"
                        flexDirection="column"
                        gap="0.15rem"
                        width="100%"
                      >
                        <Typography
                          variant="h4"
                          fontWeight="600"
                          whiteSpace="nowrap"
                          overflow="hidden"
                          textOverflow="ellipsis"
                        >
                          {FormatarMoeda(content.value)}
                        </Typography>
                        <Box
                          display="flex"
                          alignItems="center"
                          gap="0.25rem"
                          width="100%"
                        >
                          <Icon color="success">arrow_upward</Icon>
                          <Typography
                            whiteSpace="nowrap"
                            overflow="hidden"
                            textOverflow="ellipsis"
                          >
                            {FormatarMoeda(content.value)}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                    <Link to={content.to}>
                      <Button
                        size="small"
                        variant="contained"
                        disableElevation
                        sx={{
                          borderRadius: "0.75rem",
                          textTransform: "none",
                          maxWidth: "6.5rem",
                          width: "100%",
                        }}
                      >
                        Ver
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </GridCard>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, xl: 7 }}>
            <GridCard titleContainer>
              <TitleContainer title="Gastos dos últimos 12 meses" />
              {loading ? (
                <Loading width="285px" height="285px" />
              ) : (
                <BarChart
                  slotProps={{ legend: { hidden: true } }}
                  height={300}
                  borderRadius={6}
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
                />
              )}
            </GridCard>
          </Grid>

          <Grid size={{ xs: 12, xl: 5 }}>
            <GridCard titleContainer>
              <TitleContainer title="Seus gastos" />
              {loading ? (
                <Loading width="285px" height="285px" />
              ) : (
                <PieChart
                  series={[
                    {
                      data: yourExpenses,
                      valueFormatter: (data) =>
                        `${FormatarMoeda(Number(data.value))}`,
                    },
                  ]}
                  height={300}
                />
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
            <Box display="flex" justifyContent="center">
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
