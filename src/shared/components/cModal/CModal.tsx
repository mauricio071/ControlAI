import { Box, Icon, IconButton, Modal, Typography } from "@mui/material";
import { ReactNode } from "react";

interface CModalProps {
  children: ReactNode;
  title: string;
  open: boolean;
  onClose: () => void;
}

export const CModal = ({ children, title, open, onClose }: CModalProps) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
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
