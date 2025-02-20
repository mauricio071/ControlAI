import { Link } from "react-router-dom";
import { styled } from "@mui/material";

interface CLinkProps {
  color?: string;
  hovercolor?: string;
}

export const CLink = styled(Link)<CLinkProps>(
  ({ color = "#fff", hovercolor = "#f8f8f8" }) => ({
    color: color,
    textDecoration: "none",
    transition: "color 300ms ease-in-out",
    "&:hover": {
      color: hovercolor,
    },
  })
);
