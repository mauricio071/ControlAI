import { Card, CardContent } from "@mui/material";
import { ReactNode } from "react";

interface GridCardProps {
  children: ReactNode;
  maxWidth?: string;
}

export const GridCard = ({ children, maxWidth }: GridCardProps) => {
  return (
    <Card
      sx={{
        borderRadius: "0.75rem",
        boxShadow:
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        overflow: "visible",
        maxWidth: maxWidth,
      }}
    >
      <CardContent sx={{ padding: "1.5rem !important" }}>
        {children}
      </CardContent>
    </Card>
  );
};
