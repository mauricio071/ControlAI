import { Card, CardContent } from "@mui/material";
import { ReactNode } from "react";

interface GridCardProps {
  children: ReactNode;
  titleContainer?: boolean;
}

export const GridCard = ({ children, titleContainer }: GridCardProps) => {
  return (
    <Card
      sx={{
        borderRadius: "0.75rem",
        boxShadow:
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        overflow: "visible",
        marginTop: `${titleContainer ? "2rem" : "0rem"}`,
      }}
    >
      <CardContent sx={{ padding: "1.5rem !important" }}>
        {children}
      </CardContent>
    </Card>
  );
};
