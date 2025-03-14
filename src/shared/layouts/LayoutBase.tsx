import {
  Box,
  Icon,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactNode } from "react";
import { useAppThemeContext, useDrawerContext } from "../contexts";
import { Sidebar } from "../components";
import { auth } from "../../config/firebaseConfig";
import { LayoutBaseMenu } from "./components/LayoutBaseMenu";
import { MaterialUISwitch } from "./components/MaterialUISwitch";

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

  const { toggleTheme, themeName } = useAppThemeContext();

  const user = auth.currentUser;

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
          height={theme.spacing(14)}
          display="flex"
          alignItems={mdDown ? "start" : "center"}
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
            flexWrap={mdDown ? "wrap" : "nowrap"}
            gap="1rem"
            width="100%"
            height="100%"
          >
            <Typography
              variant={smDown ? "h5" : "h4"}
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              fontWeight="bold"
              width="100%"
            >
              {titulo}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              gap={smDown ? "0rem" : "0.25rem"}
              justifyContent="end"
              width="100%"
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                color="primary"
                marginRight={smDown ? "0.25rem" : "0rem"}
              >
                Olá,
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {user?.displayName}!
              </Typography>
              <MaterialUISwitch
                checked={themeName === "dark"}
                onChange={toggleTheme}
              />
              <LayoutBaseMenu />
            </Box>
          </Box>
        </Box>

        <Box flex={1} display="flex" flexDirection="column" gap={4}>
          {children}
        </Box>
      </Box>
    </Sidebar>
  );
};
