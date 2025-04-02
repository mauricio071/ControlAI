import {
  Icon,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";

interface ListItemLinkProps {
  to: string;
  icon: string;
  label: string;
  onClick?: () => void;
}

export const ListItemLink = ({
  to,
  icon,
  label,
  onClick,
}: ListItemLinkProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = async () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton
      onClick={handleClick}
      selected={!!match}
      sx={{
        marginBlock: "0.375rem",
        marginInline: "1.5rem",
        paddingBlock: "0.75rem",
        borderRadius: "0.375rem",
        "&.Mui-selected": {
          background: "linear-gradient(195deg, #49a3f1, #408aeb)",
          boxShadow:
            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        },
      }}
    >
      <ListItemIcon
        sx={{ color: theme.palette.primary.contrastText, marginRight: "-1rem" }}
      >
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};
