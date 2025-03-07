import { Box, Icon, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useAppThemeContext } from "../../contexts";
import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebaseConfig";

export const LayoutBaseMenu = () => {
  const options = ["Alterar o tema", "Sair"];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { toggleTheme } = useAppThemeContext();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Icon>settings</Icon>
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: 48 * 4.5,
              width: "15ch",
            },
          },
        }}
      >
        <MenuItem key="Alterar o tema" onClick={toggleTheme}>
          Alterar o tema
        </MenuItem>
        <MenuItem key="Sair" onClick={handleLogout}>
          Sair
        </MenuItem>
      </Menu>
    </Box>
  );
};
