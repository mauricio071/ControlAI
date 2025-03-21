import {
  Box,
  Grid2 as Grid,
  Icon,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { DespesaTable } from "./components/tables/DespesaTable";
import { RendaTable } from "./components/tables/RendaTable";
import { SaldoModal } from "./components/modals/SaldoModal";
import { GridCard } from "../../shared/components";
import { LayoutBase } from "../../shared/layouts";
import { FormatarMoeda } from "../../shared/utils/FormatarMoeda";
import { getMinhasFinancasObserver } from "../../services/observers/minhasFinancasObserver";
import {
  BalanceType,
  MinhasFinancasType,
} from "../../services/interfaces/minhasFinancas";
import { getRendaTotalAction } from "../../services/actions/minhasFinancasActions";

export const MinhasFinancas = () => {
  const [addSaldoModal, setAddSaldoModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [balance, setBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const handleMinhasFinancasData = (data: MinhasFinancasType) => {
    setLoading(true);
    setBalance(data.balance);
    setLoading(false);
  };

  useEffect(() => {
    getMinhasFinancasObserver(handleMinhasFinancasData);
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
                      color={balance < 0 ? "error" : ""}
                    >
                      {FormatarMoeda(balance)}
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
