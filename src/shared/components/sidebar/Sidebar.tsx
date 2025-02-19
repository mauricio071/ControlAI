import { ReactNode } from "react";
import {
  Drawer,
  Box,
  useMediaQuery,
  useTheme,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Icon,
  Typography,
} from "@mui/material";
import { useAppThemeContext, useDrawerContext } from "../../contexts";
import { ListItemLink } from "./ListItemLink";
import { GraphIcon } from "../icons/GraphIcon";
import { CLink } from "../cLink/CLink";

interface SidebarProps {
  children: ReactNode;
}

export const Sidebar = ({ children }: SidebarProps) => {
  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));

  const { toggleTheme } = useAppThemeContext();

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={lgDown ? "temporary" : "permanent"}
        onClose={toggleDrawerOpen}
        PaperProps={{
          sx: {
            height: "calc(100vh - 2rem)",
            borderRadius: "0.75rem",
            margin: "1rem",
            position: "fixed",
            left: "0",
            top: "0",
            boxShadow:
              "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            background: "linear-gradient(195deg, #F4A261, #e09b63)",
            color: theme.palette.primary.contrastText,
            overflowX: "hidden",
          },
        }}
      >
        <Box
          width={theme.spacing(36)}
          height="100vh"
          display="flex"
          flexDirection="column"
        >
          <CLink to="/dashboard">
            <Box
              width="100%"
              height={theme.spacing(14)}
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              paddingTop="0.5rem"
            >
              <GraphIcon />
              <Typography variant="h5" fontWeight="bold">
                ControlAÍ
              </Typography>
            </Box>
          </CLink>

          <Divider sx={{ marginInline: "2rem" }} />

          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map((drawerOption) => (
                <ListItemLink
                  key={drawerOption.path}
                  to={drawerOption.path}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  onClick={lgDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>

          <Box>
            <List component="nav">
              <ListItemButton
                onClick={toggleTheme}
                sx={{
                  marginBlock: "0.375rem",
                  marginInline: "1.5rem",
                  paddingBlock: "0.75rem",
                  borderRadius: "0.75rem",
                  background: "linear-gradient(195deg, #49a3f1, #408aeb)",
                  boxShadow:
                    "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: theme.palette.primary.contrastText,
                    marginRight: "-1rem",
                  }}
                >
                  <Icon>dark_mode</Icon>
                </ListItemIcon>
                <ListItemText primary="Alterar tema" />
              </ListItemButton>
              {/* <ListItemButton onClick={}>
                <ListItemIcon>
                  <Icon>logout</Icon>
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </ListItemButton> */}
            </List>
          </Box>
          <Typography
            variant="body1"
            fontSize="0.8rem"
            marginBottom="0.75rem"
            alignSelf="center"
          >
            Copyright &#169; 2025 Maurício Naoki
          </Typography>
        </Box>
      </Drawer>

      <Box
        minHeight={lgDown ? "100vh" : "calc(100vh - 6rem)"}
        marginLeft={lgDown ? 0 : theme.spacing(38)}
      >
        {children}
      </Box>
    </>
  );
};
