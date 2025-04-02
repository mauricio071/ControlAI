import { Box } from "@mui/material";
import { CategoriaSwitch } from "../../../shared/utils/CategoriaSwitch";

interface CategoriaBadgeProps {
  categoria: string;
}

export const CategoriaBadge = ({ categoria }: CategoriaBadgeProps) => {
  return (
    <Box display="flex" alignItems="center" gap="0.75rem">
      <Box
        borderRadius="50%"
        bgcolor={CategoriaSwitch(categoria).bgColor}
        color="white"
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding="0.25rem"
      >
        {CategoriaSwitch(categoria).icon}
      </Box>
      {CategoriaSwitch(categoria).label}
    </Box>
  );
};
