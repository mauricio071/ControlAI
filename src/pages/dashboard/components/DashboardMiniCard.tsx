import {
  Box,
  Button,
  Icon,
  Skeleton,
  Typography,
  Grid2 as Grid,
} from "@mui/material";
import { GridCard } from "../../../shared/components";
import { FormatarMoeda } from "../../../shared/utils/FormatarMoeda";
import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface DashboardMiniCardProps {
  children: ReactNode;
  icon: string;
  color: string;
  title: string;
  value: number;
  to: string;
  loading: boolean;
}

export const DashboardMiniCard = ({
  children,
  icon,
  color,
  title,
  value,
  to,
  loading,
}: DashboardMiniCardProps) => {
  return (
    <Grid size={{ xs: 12, md: 6, xl: 3 }}>
      <GridCard>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="start"
          justifyContent="space-between"
          gap="0.75rem"
          minHeight={148}
        >
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography textAlign="start" color="gray">
              {title}
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
                background: color,
              }}
            >
              <Icon sx={{ fontSize: "1.75rem" }}>{icon}</Icon>
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
                {FormatarMoeda(value)}
              </Typography>
              {title !== "Saldo" && (
                <Box
                  display="flex"
                  alignItems="center"
                  gap="0.25rem"
                  width="100%"
                >
                  {children}
                </Box>
              )}
            </Box>
          )}
          <Link to={to}>
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
      </GridCard>
    </Grid>
  );
};
