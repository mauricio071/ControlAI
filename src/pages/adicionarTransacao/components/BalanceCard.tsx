import { Box, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { getBalance } from "../../../services/actions/getBalanceAction";
import { FormatarMoeda } from "../../../shared/utils/FormatarMoeda";
import { GridCard } from "../../../shared/components";

export const BalanceCard = () => {
  const [balance, setBalance] = useState(0);

  const [balanceLoading, setBalanceLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setBalanceLoading(true);
      const data = await getBalance();
      setBalance(data.balance);
      setBalanceLoading(false);
    };

    fetchData();
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
