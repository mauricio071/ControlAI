import { Link } from "react-router-dom";
import { styled } from "@mui/material";

interface CLinkProps {
  underline?: boolean;
  color?: string;
  hovercolor?: string;
}

export const CLink = styled(Link)<CLinkProps>(
  ({ underline, color = "#fff", hovercolor = "#f8f8f8" }) => ({
    color: color,
    textDecoration: `${underline ? "" : "none"}`,
    transition: "color 300ms ease-in-out",
    "&:hover": {
      color: hovercolor,
    },
  })
);
