import { Card, CardContent } from "@mui/material";
import { ReactNode } from "react";

interface GridCardProps {
  children: ReactNode;
}

export const GridCard = ({ children }: GridCardProps) => {
  return (
    <Card
      sx={{
        borderRadius: "0.75rem",
        boxShadow:
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        overflow: "visible",
      }}
    >
      <CardContent sx={{ padding: "1rem !important" }}>{children}</CardContent>
    </Card>
  );
};
