import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ReactNode } from "react";

interface AppLocalizationProviderProps {
  children: ReactNode;
}

export const AppLocalizationProvider = ({
  children,
}: AppLocalizationProviderProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      {children}
    </LocalizationProvider>
  );
};
