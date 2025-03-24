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
import { MaterialUISwitch } from "./components/MaterialUISwitch";
import { LayoutBaseMenu } from "./components/LayoutBaseMenu";
import { auth } from "../../config/firebaseConfig";
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
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap={mdDown ? "wrap" : "nowrap"}
          gap="1rem"
          width="100%"
          height={theme.spacing(14)}
        >
          <Box display="flex" alignItems="center" gap={1}>
            {lgDown && (
              <IconButton onClick={toggleDrawerOpen}>
                <Icon fontSize={smDown ? "medium" : "large"}>menu</Icon>
              </IconButton>
            )}
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
          </Box>
          <Box
            display="flex"
            flexDirection={smDown ? "column-reverse" : "row"}
            alignItems="center"
            gap="0.75rem"
            justifyContent="end"
            width="100%"
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="end"
              width="100%"
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                color="primary"
                marginRight="0.25rem"
              >
                Olá,
              </Typography>
              <Typography
                maxWidth="250px"
                variant="h5"
                fontWeight="bold"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {user?.displayName?.split(" ")[0]}!
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="end"
              marginLeft="auto"
            >
              <MaterialUISwitch
                checked={themeName === "dark"}
                onChange={toggleTheme}
              />
              <LayoutBaseMenu />
            </Box>
          </Box>
        </Box>

        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          gap={4}
          marginTop="2rem"
        >
          {children}
        </Box>
      </Box>
    </Sidebar>
  );
};
