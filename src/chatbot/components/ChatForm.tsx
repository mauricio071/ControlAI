import { Icon, IconButton, InputAdornment, TextField } from "@mui/material";
import { useRef } from "react";

export interface ChatType {
  role: string;
  text: string;
  isError?: boolean;
  hideInChat?: boolean;
}

interface ChatFormProps {
  chatHistory: ChatType[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatType[]>>;
  generateBotResponse: (history: ChatType[]) => void;
}

export const ChatForm = ({
  chatHistory,
  setChatHistory,
  generateBotResponse,
}: ChatFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = () => {
    if (!inputRef.current) return;

    const userMessage = inputRef.current?.value.trim();

    if (!userMessage) return;
    inputRef.current.value = "";

    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "...." },
      ]);

      generateBotResponse([
        ...chatHistory,
        {
          role: "user",
          text: `Usando os detalhes fornecidos acima, responda a esta pergunta: ${userMessage}`,
        },
      ]);
    }, 600);
  };

  return (
    <TextField
      inputRef={inputRef}
      placeholder="Faça a sua pergunta..."
      variant="outlined"
      type="text"
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
                sx={{
                  bgcolor: (theme) => theme.palette.primary.main,
                  "&:hover": {
                    bgcolor: (theme) => theme.palette.primary.dark,
                  },
                }}
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
