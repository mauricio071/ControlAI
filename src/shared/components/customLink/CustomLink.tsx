import { Link } from "react-router-dom";
import { styled } from "@mui/material";

interface CustomLinkProps {
  color?: string;
  hoverColor?: string;
}

export const CustomLink = styled(Link)<CustomLinkProps>(
  ({ color = "#fff", hoverColor = "#f8f8f8" }) => ({
    color: color,
    textDecoration: "none",
    transition: "color 300ms ease-in-out",
    "&:hover": {
      color: hoverColor,
    },
  })
);
