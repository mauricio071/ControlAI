import { Grow, Icon } from "@mui/material";

interface CloseIconProps {
  showChatbot: boolean;
}

export const CloseIcon = ({ showChatbot }: CloseIconProps) => {
  return (
    <Grow in={showChatbot}>
      <Icon
        sx={{
          color: "#fff",
          height: "40px",
          width: "40px",
          padding: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
        }}
      >
        close
      </Icon>
    </Grow>
  );
};
