import { Box, Button, Grid2 as Grid, Icon, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts";
import { Link } from "react-router-dom";

import { GridCard } from "../../shared/components";
import { LayoutBase } from "../../shared/layouts";
import { CustomLink } from "../../shared/components/customLink/CustomLink";

export const Dashboard = () => {
  const gridContents = [
    {
      icon: "account_balance_wallet",
      color: "linear-gradient(195deg, #49a3f1, #1A73E8)",
      title: "Saldo",
      value: 300,
      to: "/perfil-usuario",
    },
    {
      icon: "home",
      color: "linear-gradient(195deg, #FF8A00, #FF5E00)",
      title: "Gasto Fixo Mensal",
      value: 1200,
      to: "/perfil-usuario",
    },
    {
      icon: "credit_card",
      color: "linear-gradient(195deg, #FFB6C1, #FF1493)",
      title: "Gasto do Mês",
      value: 1500,
      to: "/perfil-usuario",
    },
    {
      icon: "trending_up",
      color: "linear-gradient(195deg, #66BB6A, #388E3C)",
      title: "Economia",
      value: 200,
      to: "/historico",
    },
  ];

  const pData = [
    2400, 1398, 9800, 3908, 4800, 3800, 4300, 1398, 9800, 3908, 4800, 3800,
  ];
  const xLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const lastTransactions = [
    {
      id: 1,
      type: "gain",
      value: 300,
      date: "01/01/2025 19:00",
    },
    {
      id: 2,
      type: "lost",
      value: 300,
      date: "01/01/2025 19:00",
    },
    {
      id: 3,
      type: "gain",
      value: 300,
      date: "01/01/2025 19:00",
    },
    {
      id: 4,
      type: "gain",
      value: 300,
      date: "01/01/2025 19:00",
    },
    {
      id: 5,
      type: "gain",
      value: 300,
      date: "01/01/2025 19:00",
    },
  ];

  return (
    <LayoutBase titulo="Dashboard">
      <Box>
        <Grid container spacing={3}>
          {gridContents.map((content) => (
            <Grid size={{ xs: 12, md: 6, lg: 3 }} key={content.title}>
              <GridCard>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  paddingInline="0.5rem"
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="start"
                    gap="0.75rem"
                  >
                    <Typography textAlign="start" color="gray">
                      {content.title}
                    </Typography>
                    <Box display="flex" gap="0.5rem">
                      <Typography variant="h4" fontWeight="600" color="#222B3A">
                        R$ {content.value}
                      </Typography>
                      <Box display="flex" alignItems="center" gap="0.25rem">
                        <Icon color="success">arrow_upward</Icon>
                        <Typography>R$ 300</Typography>
                      </Box>
                    </Box>
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
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="4rem"
                    width="4rem"
                    borderRadius="0.75rem"
                    boxShadow="0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
                    marginTop="-2.5rem"
                    sx={{
                      background: content.color,
                    }}
                    color="white"
                  >
                    <Icon sx={{ fontSize: "1.75rem" }}>{content.icon}</Icon>
                  </Box>
                </Box>
              </GridCard>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 7 }}>
            <GridCard>
              <BarChart
                slotProps={{ legend: { hidden: true } }}
                height={300}
                borderRadius={6}
                series={[{ data: pData, label: "pv", id: "pvId" }]}
                xAxis={[{ data: xLabels, scaleType: "band" }]}
              />
            </GridCard>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <GridCard>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: "series A" },
                      { id: 1, value: 15, label: "series B" },
                      { id: 2, value: 20, label: "series C" },
                    ],
                  },
                ]}
                height={300}
              />
            </GridCard>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginBottom="1rem"
        >
          <Typography variant="h6" fontWeight="bold">
            Últimas transações
          </Typography>
          <CustomLink to="/historico">Histórico completo</CustomLink>
        </Box>
        <Box display="flex" flexDirection="column" gap="1rem">
          {lastTransactions.map((transaction) => (
            <GridCard key={transaction.id}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                gap="1"
              >
                <Typography variant="body1" fontWeight="bold">
                  {transaction.date}
                </Typography>
                <Box display="flex" alignItems="center" gap="0.25rem">
                  {transaction.type === "gain" ? (
                    <Icon color="success">arrow_upward</Icon>
                  ) : (
                    <Icon color="error">arrow_downward</Icon>
                  )}
                  <Typography>R$ {transaction.value}</Typography>
                </Box>
              </Box>
            </GridCard>
          ))}
        </Box>
      </Box>
    </LayoutBase>
  );
};
