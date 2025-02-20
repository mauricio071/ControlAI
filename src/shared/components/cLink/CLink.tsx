import { Link } from "react-router-dom";
import { styled } from "@mui/material";

interface CLinkProps {
  tdecoration?: string;
  color?: string;
  hovercolor?: string;
}

export const CLink = styled(Link)<CLinkProps>(
  ({ tdecoration = "", color = "#fff", hovercolor = "#f8f8f8" }) => ({
    color: color,
    textDecoration: `${tdecoration ? "" : "none"}`,
    transition: "color 300ms ease-in-out",
    "&:hover": {
      color: hovercolor,
    },
  })
);
