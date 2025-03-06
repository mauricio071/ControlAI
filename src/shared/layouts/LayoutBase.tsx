import {
  Box,
  Icon,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactNode } from "react";
import { useDrawerContext } from "../contexts";
import { Sidebar } from "../components";

interface LayoutBaseProps {
  children: ReactNode;
  titulo: string;
}

export const LayoutBase = ({ children, titulo }: LayoutBaseProps) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));

  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Sidebar>
      <Box
        minHeight="calc(100vh - 5rem)"
        display="flex"
        flexDirection="column"
        gap={1}
        paddingInline={smDown ? "1rem" : "2rem"}
        paddingTop="1rem"
        paddingBottom="4rem"
      >
        <Box
          height={
            smDown
              ? theme.spacing(6)
              : mdDown
              ? theme.spacing(8)
              : theme.spacing(12)
          }
          display="flex"
          alignItems="center"
          gap={1}
        >
          {lgDown && (
            <IconButton onClick={toggleDrawerOpen}>
              <Icon fontSize={smDown ? "medium" : "large"}>menu</Icon>
            </IconButton>
          )}

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Typography
              variant={smDown ? "h5" : "h4"}
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              fontWeight="bold"
            >
              {titulo}
            </Typography>
            <Typography variant="h5" fontWeight="500">
              Usuário
            </Typography>
          </Box>
        </Box>

        <Box flex={1} display="flex" flexDirection="column" gap={4}>
          {children}
        </Box>
      </Box>
    </Sidebar>
  );
};
