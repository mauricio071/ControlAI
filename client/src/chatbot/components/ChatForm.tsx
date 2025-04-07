import { Icon, IconButton, InputAdornment, TextField } from "@mui/material";
import { useRef, useState } from "react";

import { useChatbotContext } from "../../shared/contexts/ChatbotContext";

export interface ChatType {
  role: string;
  text: string;
  isError?: boolean;
  hideInChat?: boolean;
}

export const ChatForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [thinking, setThinking] = useState(false);

  const { setChatHistory, chatHistory, generateBotResponse, firstRequest } =
    useChatbotContext();

  const handleFormSubmit = () => {
    if (!inputRef.current) return;

    const userMessage = inputRef.current?.value.trim();

    if (!userMessage) return;
    inputRef.current.value = "";

    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    setThinking(true);

    setTimeout(async () => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "...." },
      ]);

      await generateBotResponse([
        ...chatHistory,
        {
          role: "user",
          text: `Usando os detalhes fornecidos acima, responda a esta pergunta: ${userMessage}`,
        },
      ]);

      setThinking(false);
    }, 600);
  };

  return (
    <TextField
      inputRef={inputRef}
      placeholder="Faça a sua pergunta..."
      variant="outlined"
      type="text"
      disabled={thinking || firstRequest}
      fullWidth
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleFormSubmit();
        }
      }}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleFormSubmit}
                disabled={thinking || firstRequest}
                sx={{
                  bgcolor: (theme) => theme.palette.primary.main,
                  "&:hover": {
                    bgcolor: (theme) => theme.palette.primary.dark,
                  },
                  "&:disabled": {
                    bgcolor: (theme) => theme.palette.cGray.light,
                  },
                }}
                aria-label="enviar mensagem"
              >
                <Icon
                  sx={{
                    color: "white",
                    fontSize: "1.3rem",
                    padding: "0.15rem",
                  }}
                >
                  send
                </Icon>
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "1.75rem",
        },
      }}
      autoComplete="off"
    />
  );
};
