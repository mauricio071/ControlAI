import { Box, Theme, useMediaQuery, Grid2 as Grid } from "@mui/material";

import { AddTransacaoForm } from "./components/AddTransacaoForm";
import { BalanceCard } from "./components/BalanceCard";
import { LayoutBase } from "../../shared/layouts";

export const AdicionarTransacao = () => {
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  return (
    <LayoutBase titulo="Adicionar Transação">
      <Grid
        container
        spacing={3}
        flexDirection={{ xs: "column-reverse", md: "row" }}
      >
        <Grid size={{ xs: 12, md: 8, xl: 6 }}>
          <Box margin={lgDown ? "auto" : "none"}>
            <AddTransacaoForm />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4, xl: 3 }}>
          <Box marginTop={mdDown ? "0" : "2rem"}>
            <BalanceCard />
          </Box>
        </Grid>
      </Grid>
    </LayoutBase>
  );
};
