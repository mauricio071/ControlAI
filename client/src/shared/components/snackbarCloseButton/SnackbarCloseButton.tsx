import { Icon, IconButton } from "@mui/material";
import { useSnackbar } from "notistack";

export const SnackbarCloseButton = ({
  snackbarKey,
}: {
  snackbarKey: string | number;
}) => {
  const { closeSnackbar } = useSnackbar();
  return (
    <IconButton
      onClick={() => closeSnackbar(snackbarKey)}
      size="small"
      aria-label="close"
      color="inherit"
    >
      <Icon fontSize="small">close</Icon>
    </IconButton>
  );
};
