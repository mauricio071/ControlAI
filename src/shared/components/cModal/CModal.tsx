import {
  Box,
  Icon,
  IconButton,
  Modal,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ReactNode } from "react";
import { TitleContainer } from "../titleContainer/TitleContainer";

interface CModalProps {
  children: ReactNode;
  title: string;
  open: boolean;
  onClose: () => void;
}

export const CModal = ({ children, title, open, onClose }: CModalProps) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: `${smDown ? "60vw" : "400px"}`,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "0.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between">
          <Typography
            variant="h6"
            component="h2"
            fontSize="1.75rem"
            fontWeight="bold"
          >
            {title}
          </Typography>
          {/* <TitleContainer title={title} /> */}
          <IconButton
            onClick={onClose}
            sx={{
              marginTop: "-1.5rem",
              marginRight: "-0.75rem",
              width: "2.5rem",
              height: "2.5rem",
            }}
          >
            <Icon>close</Icon>
          </IconButton>
        </Box>
        {children}
      </Box>
    </Modal>
  );
};
