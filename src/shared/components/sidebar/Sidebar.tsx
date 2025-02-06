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
} from "@mui/material";
import { useAppThemeContext, useDrawerContext } from "../../contexts";
import { ListItemLink } from "./ListItemLink";

interface SidebarProps {
  children: ReactNode;
}

export const Sidebar = ({ children }: SidebarProps) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const { toggleTheme } = useAppThemeContext();

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? "temporary" : "permanent"}
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
          },
        }}
      >
        <Box
          width={theme.spacing(40)}
          height="100vh"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(16)}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <h2>ControlAí</h2>
          </Box>

          <Divider sx={{ marginInline: "2rem" }} />

          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map((drawerOption) => (
                <ListItemLink
                  key={drawerOption.path}
                  to={drawerOption.path}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  onClick={smDown ? toggleDrawerOpen : undefined}
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
                  borderRadius: "0.375rem",
                  background: "linear-gradient(195deg, #49a3f1, #408aeb)",
                }}
              >
                <ListItemIcon
                  sx={{ color: theme.palette.primary.contrastText }}
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
        </Box>
      </Drawer>

      <Box
        height={smDown ? "100vh" : "calc(100vh - 8rem)"}
        marginLeft={smDown ? 0 : theme.spacing(40)}
        padding={smDown ? 0 : theme.spacing(8)}
      >
        {children}
      </Box>
    </>
  );
};
