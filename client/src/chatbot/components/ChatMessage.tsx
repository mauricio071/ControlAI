import { Box, Typography } from "@mui/material";

import { useAppThemeContext } from "../../shared/contexts";
import { ChatbotIcon } from "./ChatbotIcon";
import { ChatType } from "./ChatForm";

interface ChatMessageProps {
  chat: ChatType;
}

export const ChatMessage = ({ chat }: ChatMessageProps) => {
  const { themeName } = useAppThemeContext();

  return (
    !chat.hideInChat && (
      <Box
        display="flex"
        gap="11px"
        flexDirection={chat.role === "user" ? "column" : "row"}
        alignItems={chat.role === "user" ? "flex-end" : "center"}
        color={chat.isError ? "error" : ""}
      >
        {chat.role === "model" && (
          <ChatbotIcon
            sx={{
              fill: "#fff",
              alignSelf: "flex-end",
              marginBottom: "2px",
              background: themeName === "dark" ? "#D8854B" : "#F4A261",
            }}
          />
        )}
        <Typography
          padding="0.75rem 1rem"
          maxWidth="75%"
          whiteSpace="pre-line"
          fontSize="0.95rem"
          borderRadius={
            chat.role === "model" ? "13px 13px 13px 3px" : "13px 13px 3px 13px"
          }
          sx={{
            color: `${chat.role === "user" ? "#fff" : "black"}`,
            background: `${
              chat.role === "model"
                ? "#fceddb"
                : `${themeName === "dark" ? "#D8854B" : "#F4A261"}`
            }`,
            wordWrap: "break-word",
          }}
        >
          {chat.text}
        </Typography>
      </Box>
    )
  );
};
