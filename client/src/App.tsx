import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";
// @ts-expect-error está funcionando
import "@fontsource/inter";

import {
  AppLocalizationProvider,
  AppThemeProvider,
  DrawerProvider,
} from "./shared/contexts";
import { SnackbarCloseButton } from "./shared/components/snackbarCloseButton/SnackbarCloseButton";
import { ChatbotProvider } from "./shared/contexts/ChatbotContext";
import { AppRoutes } from "./routes";

dayjs.locale("pt-br");

export const App = () => {
  return (
    <SnackbarProvider
      autoHideDuration={2000}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
      action={(snackbarKey) => (
        <SnackbarCloseButton snackbarKey={snackbarKey} />
      )}
    >
      <AppThemeProvider>
        <AppLocalizationProvider>
          <DrawerProvider>
            <ChatbotProvider>
              <BrowserRouter>
                <AppRoutes />
              </BrowserRouter>
            </ChatbotProvider>
          </DrawerProvider>
        </AppLocalizationProvider>
      </AppThemeProvider>
    </SnackbarProvider>
  );
};
