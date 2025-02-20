import {
  Box,
  Grid2 as Grid,
  Icon,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { DespesaTable } from "./components/tables/DespesaTable";
import { RendaTable } from "./components/tables/RendaTable";
import { SaldoModal } from "./components/modals/SaldoModal";
import { GridCard } from "../../shared/components";
import { LayoutBase } from "../../shared/layouts";
import { FormatarMoeda } from "../../shared/utils/FormatarMoeda";

export const MinhasFinancas = () => {
  const [addSaldoModal, setAddSaldoModal] = useState(false);

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
                  <Typography
                    variant="h4"
                    fontWeight="600"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {FormatarMoeda(3000)}
                  </Typography>
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
                  Renda total
                </Typography>
                <Box display="flex" gap="0.5rem" width="100%">
                  <Typography
                    variant="h4"
                    fontWeight="600"
                    color="success"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {FormatarMoeda(300)}
                  </Typography>
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
                  Despesa total
                </Typography>
                <Box display="flex" gap="0.5rem" width="100%">
                  <Typography
                    variant="h4"
                    fontWeight="600"
                    color="error"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {FormatarMoeda(300)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </GridCard>
        </Grid>
      </Grid>
      <RendaTable />
      <DespesaTable />
    </LayoutBase>
  );
};
