import { Box, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { getMinhasFinancasObserver } from "../../../services/observers/minhasFinancasObserver";
import { MinhasFinancasType } from "../../../services/interfaces/minhasFinancas";
import { FormatarMoeda } from "../../../shared/utils/FormatarMoeda";
import { GridCard } from "../../../shared/components";

export const BalanceCard = () => {
  const [balance, setBalance] = useState(0);

  const [balanceLoading, setBalanceLoading] = useState(true);

  const handleMinhasFinancasData = (data: MinhasFinancasType) => {
    setBalanceLoading(true);
    setBalance(data.balance);
    setBalanceLoading(false);
  };

  useEffect(() => {
    getMinhasFinancasObserver(handleMinhasFinancasData);
  }, []);

  return (
    <GridCard>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="start"
          gap="0.75rem"
          width="100%"
        >
          <Typography textAlign="start" color="gray">
            Saldo atual
          </Typography>
          <Box display="flex" gap="0.5rem" width="100%">
            {balanceLoading ? (
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
      </Box>
    </GridCard>
  );
};
