import {
  Box,
  Grid2 as Grid,
  Icon,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { BalanceType } from "../../services/interfaces/minhasFinancas";
import { getBalance } from "../../services/accesses/getBalanceAccess";
import { FormatarMoeda } from "../../shared/utils/FormatarMoeda";
import { DespesaTable } from "./components/tables/DespesaTable";
import { SaldoModal } from "./components/modals/SaldoModal";
import { RendaTable } from "./components/tables/RendaTable";
import { GridCard } from "../../shared/components";
import { LayoutBase } from "../../shared/layouts";

export const MinhasFinancas = () => {
  const [addSaldoModal, setAddSaldoModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [balance, setBalance] = useState<BalanceType>({} as BalanceType);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getBalance();
      setBalance(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <LayoutBase titulo="Minhas finanças">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <GridCard>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="start"
                gap="0.75rem"
                width="80%"
              >
                <Typography textAlign="start" color="gray">
                  Saldo atual
                </Typography>
                <Box display="flex" gap="0.5rem" width="100%">
                  {loading ? (
                    <Skeleton variant="rounded" width="100%" height={43} />
                  ) : (
                    <Typography
                      variant="h4"
                      fontWeight="600"
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      color={balance.balance < 0 ? "error" : ""}
                    >
                      {FormatarMoeda(balance.balance)}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box>
                <IconButton onClick={() => setAddSaldoModal(true)}>
                  <Icon color="secondary" sx={{ fontSize: "2.5rem" }}>
                    edit
                  </Icon>
                </IconButton>
              </Box>
            </Box>
          </GridCard>
          <SaldoModal
            balance={balance}
            addSaldoModal={addSaldoModal}
            setAddSaldoModal={setAddSaldoModal}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <GridCard>
            <Box display="flex" justifyContent="space-between">
              <Box
                display="flex"
                flexDirection="column"
                alignItems="start"
                gap="0.75rem"
                width="100%"
              >
                <Typography textAlign="start" color="gray">
                  Renda mensal total
                </Typography>
                <Box display="flex" gap="0.5rem" width="100%">
                  {loading ? (
                    <Skeleton variant="rounded" width="100%" height={43} />
                  ) : (
                    <Typography
                      variant="h4"
                      fontWeight="600"
                      color="success"
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {FormatarMoeda(totalIncome)}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </GridCard>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <GridCard>
            <Box display="flex" justifyContent="space-between">
              <Box
                display="flex"
                flexDirection="column"
                alignItems="start"
                gap="0.75rem"
                width="100%"
              >
                <Typography textAlign="start" color="gray">
                  Gasto mensal total
                </Typography>
                <Box display="flex" gap="0.5rem" width="100%">
                  {loading ? (
                    <Skeleton variant="rounded" width="100%" height={43} />
                  ) : (
                    <Typography
                      variant="h4"
                      fontWeight="600"
                      color="error"
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {FormatarMoeda(totalExpense)}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </GridCard>
        </Grid>
      </Grid>
      <RendaTable setTotalIncome={setTotalIncome} />
      <DespesaTable setTotalExpense={setTotalExpense} />
    </LayoutBase>
  );
};
