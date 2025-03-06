import { Box, Typography } from "@mui/material";
import { FieldError } from "react-hook-form";
import { ReactNode } from "react";

interface CInputProps {
  children: ReactNode;
  error?: FieldError;
}

export const CInput = ({ children, error }: CInputProps) => {
  return (
    <Box display="flex" flexDirection="column" gap="0.25rem">
      {children}
      {error && (
        <Typography color="error" variant="caption">
          {error.message}
        </Typography>
      )}
    </Box>
  );
};
