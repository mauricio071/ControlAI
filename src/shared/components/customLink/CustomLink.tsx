import { Link } from "react-router-dom";
import { styled } from "@mui/material";

export const CustomLink = styled(Link)({
  color: "#1976D2",
  textDecoration: "none",
  "&:hover": {
    color: "#1565C0",
  },
});
