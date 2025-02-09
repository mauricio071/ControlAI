import {
  Box,
  Button,
  Card,
  CardContent,
  Grid2 as Grid,
  Icon,
  Typography,
} from "@mui/material";
import { LayoutBase } from "../../shared/layouts";

export const Dashboard = () => {
  return (
    <LayoutBase titulo="Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Card
              sx={{
                borderRadius: "0.75rem",
                boxShadow:
                  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                overflow: "visible",
              }}
            >
              <CardContent>
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
                      Saldo
                    </Typography>
                    <Box display="flex" gap="0.5rem">
                      <Typography variant="h4" fontWeight="600" color="#222B3A">
                        R$ 300
                      </Typography>
                      <Typography display="flex" alignItems="center">
                        <Icon color="success">arrow_upward</Icon>
                        R$ 300
                      </Typography>
                    </Box>
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
                      background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
                    }}
                    color="white"
                  >
                    <Icon>account_balance_wallet</Icon>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </LayoutBase>
  );
};
