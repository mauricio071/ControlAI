import { Box, Grow, Icon, IconButton, Typography } from "@mui/material";
import { useEffect, useRef } from "react";

import { useChatbotContext } from "../shared/contexts/ChatbotContext";
import { ChatbotIcon } from "./components/ChatbotIcon";
import { ChatMessage } from "./components/ChatMessage";
import { ChatForm } from "./components/ChatForm";
import { auth } from "../config/firebaseConfig";

interface ChatbotProps {
  smDown: boolean;
  showChatbot: boolean;
  toggleChatbotVisibility: () => void;
}

export const Chatbot = ({
  smDown,
  showChatbot,
  toggleChatbotVisibility,
}: ChatbotProps) => {
  const user = auth.currentUser;

  const { chatHistory, setChatHistory, generateBotResponse } =
    useChatbotContext();

  const chatbodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatbodyRef.current?.scrollTo({
      top: chatbodyRef.current.scrollHeight,
    });
  }, [chatHistory]);

  return (
    <Grow in={showChatbot} appear={false}>
      <Box
        position="fixed"
        width={smDown ? "unset" : "100%"}
        maxWidth="26rem"
        marginInline="1rem"
        overflow="hidden"
        bgcolor="#fff"
        borderRadius="1rem"
        boxShadow="0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
        zIndex="10"
        right={smDown ? "0rem" : "2rem"}
        bottom={smDown ? "5.5rem" : "7rem"}
        sx={{
          transformOrigin: "bottom right",
        }}
      >
        <Box
          display="flex"
          padding="1rem 1.375rem"
          alignItems="center"
          justifyContent="space-between"
          bgcolor="#F4A261"
        >
          <Box display="flex" gap="0.625rem" alignItems="center">
            <ChatbotIcon sx={{ fill: "#F4A261", background: "#fff" }} />
            <Typography color="#fff" fontSize="1.31rem" fontWeight={600}>
              Chatbot
            </Typography>
          </Box>
          <IconButton onClick={toggleChatbotVisibility} size="small">
            <Icon fontSize="large" sx={{ color: "white" }}>
              keyboard_arrow_down
            </Icon>
          </IconButton>
        </Box>

        <Box
          ref={chatbodyRef}
          height="calc(100vh - 27rem)"
          maxHeight="26rem"
          display="flex"
          flexDirection="column"
          gap="1.25rem"
          marginBottom="5.125rem"
          padding="1.5rem 1.375rem"
          sx={{
            scrollbarWidth: "thin",
            scrollbarColor: "#f0c5a1 transparent",
            overflowY: "auto",
          }}
          bgcolor={(theme) => theme.palette.background.default}
        >
          <Box display="flex" gap="0.625rem" alignItems="center">
            <ChatbotIcon
              sx={{
                fill: "#fff",
                alignSelf: "flex-end",
                marginBottom: "2px",
                background: "#F4A261",
              }}
            />
            <Typography
              padding="0.75rem 1rem"
              maxWidth="75%"
              whiteSpace="pre-line"
              fontSize="0.95rem"
              bgcolor="#fceddb"
              borderRadius="13px 13px 13px 3px"
              sx={{
                wordWrap: "break-word",
                color: "black",
              }}
            >
              Olá, {user?.displayName?.split(" ")[0]}! Sou seu assistente
              financeiro virtual e estou aqui para te ajudar com informações
              sobre suas finanças. Posso te ajudar a entender seus gastos e até
              mesmo sugerir melhorias.
            </Typography>
          </Box>

          <Box display="flex" gap="0.625rem" alignItems="center">
            <ChatbotIcon
              sx={{
                fill: "#fff",
                alignSelf: "flex-end",
                marginBottom: "2px",
                background: "#F4A261",
              }}
            />
            <Typography
              padding="0.75rem 1rem"
              maxWidth="75%"
              whiteSpace="pre-line"
              fontSize="0.95rem"
              bgcolor="#fceddb"
              borderRadius="13px 13px 13px 3px"
              sx={{
                wordWrap: "break-word",
                color: "black",
              }}
            >
              Em que posso te ajudar?
            </Typography>
          </Box>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </Box>

        <Box
          position="absolute"
          bottom={0}
          width="100%"
          padding="1rem"
          boxSizing="border-box"
          bgcolor={(theme) => theme.palette.background.default}
        >
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </Box>
      </Box>
    </Grow>
  );
};
