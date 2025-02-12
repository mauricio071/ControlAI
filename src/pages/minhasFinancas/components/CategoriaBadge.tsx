import { Box, Icon, Typography } from "@mui/material";

interface CategoriaBadgeProps {
  categoria: string;
}

export const CategoriaBadge = ({ categoria }: CategoriaBadgeProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap="0.5rem"
      paddingBlock="0.25rem"
      paddingInline="0.75rem"
      bgcolor="blue"
      color="white"
      maxWidth="10rem"
      borderRadius="2rem"
    >
      <Icon>dark_mode</Icon>
      <Typography variant="body1" fontSize="0.9rem">
        CategoriaBadge
      </Typography>
    </Box>
  );
};
